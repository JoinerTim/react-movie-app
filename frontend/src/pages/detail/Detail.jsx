import React, { useEffect, useState, useContext } from 'react'


import { useParams } from 'react-router'

import './detail.scss'

import { Link } from 'react-router-dom'

import MovieList from '../../components/movie-list/MovieList'
import CastList from './CastList'
import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import VideoList from './VideoList'
import { GlobalContext } from '../../context/GlobalState'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

export const SupportDetail = () => {


  const [item, setItem] = useState(null);
  const { category, id, language } = useParams();

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: { language: localStorage.getItem('language') ? 'vi' : 'en' } });
      setItem(response);
      window.scrollTo(0, 0);
    }
    getDetail()
  }, [category, id, language])
  return (
    <Detail item={item}></Detail>
  )
}

const Detail = ({ item }) => {
  const { category, id } = useParams();

  const { addMovieToWatchlist, addMovieToFavourite, watchlist, addTvToWatchlist, addTvToFavourite, tvwatchlist, favourite, tvfavourite } = useContext(GlobalContext);

  const [isActive, setIsActive] = useState(false)
  const [isActivetv, setIsActivetv] = useState(false)


  const [isActiveFv, setIsActiveFv] = useState(false)
  const [isActivetvFv, setIsActivetvFv] = useState(false)

  // const isStored = watchlist.find(o => o.id.toString() === id);
  // const isAvtice = isStored ? true : false


  // const isStoredtv = tvwatchlist.find(o => o.id === id);
  // const isAvticetv = isStoredtv ? true : false

  useEffect(() => {
    const isStored = watchlist.find(o => o.id.toString() === id);
    setIsActive(isStored)

    const isStoredtv = tvwatchlist.find(o => o.id.toString() === id);
    setIsActivetv(isStoredtv)

    const isStoredFv = favourite.find(o => o.id.toString() === id);
    setIsActiveFv(isStoredFv)

    const isStoredtvFv = tvfavourite.find(o => o.id.toString() === id);
    setIsActivetvFv(isStoredtvFv)




  }, [watchlist, tvwatchlist, id, favourite, tvfavourite])

  document.cookie = "samesite=Strict";

  return (
    <>
      {
        item && (
          <>
            <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>

              <div className="mb-3 movie-content container">
                <div className="movie-content__poster">
                  <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                </div>
                <div className='movie-content__info'>
                  <div className="title">
                    {item.title || item.name}
                    <span className='span--year' style={{  color: "rgb(197, 192, 192)" }}>   ( {item.release_date ? item.release_date.slice(0, 4) : item.last_air_date.slice(0, 4)} )</span>
                  </div>
                  <div className="genres">
                    {
                      item.genres && item.genres.slice(0, 5).map((genre, i) => (
                        <span key={i} className="genres__item"> {genre.name}</span>
                      ))
                    }
                  </div>

                  <ul className='actions'>
                    <li className='actions-item'>
                      <div className="actions-item__users">
                        Users Action
                      </div>
                    </li>
                    {/* <li className='actions-item'>
                      <Link to="#">
                        <span><i className="fa-solid fa-list"></i></span>
                      </Link>
                    </li> */}
                    <li className='actions-item'>
                      <div className='actions-item-fix'
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isActiveFv && !isActivetvFv) {
                            toast.success("Your action was successfully!");
                            if (item.poster_path || item.backdrop_path) {
                              if (category === 'movie') { addMovieToFavourite(item) }
                              else {
                                addTvToFavourite(item)
                              }
                            }
                          } else {
                            toast.error("You have already done it!");
                          }
                        }}
                      >
                        <span><i className="fa-solid fa-heart"></i></span>
                      </div>
                    </li>
                    <li className='actions-item'>
                      <div className='actions-item-fix'
                        // disabled={watchlistDisabled}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isActive && !isActivetv) {
                            toast.success("Your action was successfully!");
                            if (item.poster_path || item.backdrop_path) {
                              if (category === 'movie') { addMovieToWatchlist(item) }
                              else {
                                addTvToWatchlist(item)
                              }
                            }
                          } else {
                            toast.error("You have already done it!");
                          }
                        }}
                      >
                        <span><i className="fa-solid fa-bookmark"></i></span>
                      </div>
                    </li>
                    {/* <li className='actions-item'>
                      <Link to="#">
                        <span><i className="fa-solid fa-star"></i></span>
                      </Link>
                    </li> */}
                  </ul>

                  <h4>Overview</h4>
                  <p className='overview'>{item.overview}</p>

                </div>
              </div>

            </div>

            <div className="container">
              <div className="case">
                <div className="section__header">
                  <h2>Elite actor</h2>
                </div>
                <CastList id={item.id} />
              </div>
              <div className="section mb-3">
                <VideoList id={item.id} />
              </div>
              <div className="section mb-3">
                <div className="section__header mb-2">
                  <h2>Similar</h2>
                </div>
                <MovieList category={category} type="similar" id={id} />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Detail