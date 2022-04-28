import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi'
import MovieCard from '../movie-card/MovieCard'

const Search = () => {


  const { keyword, category } = useParams()
  const [items, setItems]= useState([])
  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {
        query: keyword
      }
      response = await tmdbApi.search(category, { params })
      setItems(response.results)
    }
    getList();
  }, [category, keyword])
  return (
    <div className="container" >
      <div className="header-fake" style={{height:'84px'}}></div>
      <div className='movie-grid' style={{backgroundColor:"black", borderRadius:'20px'}}>
      {
        items.map((item, i) => <MovieCard category={category} item={item} key={i} />)
      }
    </div>
    </div>
  )
}

export default Search