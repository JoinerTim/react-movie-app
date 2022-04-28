import React, { useState, useEffect} from 'react'
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi'
import ReactPaginate from "react-paginate";

import './person.scss'
import { Link } from 'react-router-dom';

const Person = () => {

  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);


  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {
        page : 1
      };
      response = await tmdbApi.getPerson({ params });
      setItems(response.results.slice(0, 18));
      setpageCount((Math.ceil( response.total_results / response.results.length)))
    }
    getList();
  }, [])


  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiConfig.apiKey}&language=en-US&page=${currentPage}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log('data.selected', data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer.results.slice(0, 18));
    window.scrollTo(0, 0)
  };
  return (

    <>
      <div className="header__fake"></div>
      <div className="container">
      <h2 className='header-people'>Popular People</h2>
          <div className="movie-grid">
            {items.map((item, i) => (
              <div key={i} className="mask">
                <Link to="#" className="movie-card" style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}></Link>
                <Link to="#" className='cast_name'>{item.name}</Link>
                
              </div>
            ))}
          </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  )
}

export default Person