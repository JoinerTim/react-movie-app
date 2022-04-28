import React from 'react'

import { GlobalContext } from '../../context/GlobalState'
import { useContext, useRef} from 'react'
import { Link, useParams} from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
const MovieCardList = ({ item, i, type }) => {
    const {category} = useParams();


    const { 
        removeMovieFromWatchlist, removeMovieToFavourite,
        removeTvFromWatchlist,  addMovieToFavourite,
        favourite,tvfavourite, addTvToFavourite,
        removeTvToFavourite,watched, addTvToWatched,
        addMovieToWatched, removeTvFromWatched,
        removeMovieFromWatched,tvwatched
    } = useContext(GlobalContext);

    const isStored = favourite.find(o => o.id === item.id);
    const isActive = isStored ? true : false
    const isActiveTv = tvfavourite.find(o => o.id === item.id) ? true : false;
    const refHeartCheck = useRef();
    const refHeartCheck2 = useRef();

    const isStored2 = watched.find(o => o.id === item.id);
    const isActive2 = isStored2 ? true : false
    const isActiveTv2 = tvwatched.find(o => o.id === item.id) ? true : false;

    const link = '/' + `${category }` + '/' + item.id + `/${item.name ? item.name.replace(/\s/g, '-') : item.title.replace(/\s/g, '-')}`;
    
    return (
        <div className="content__wrap" key={i}>
            <div className="image" >
                <Link to={link} ><img src={`${apiConfig.originalImage(item.backdrop_path || item.poster_path)}`} alt="" /></Link>
            </div>
            <div className="content">
                <Link to={link} className="title">{item.title || item.name}</Link>
                <div className="overview">{item.overview}</div>
                <div className="actions">
                    <ul className='actions__list'>
                        {/* <li className="actions__item">
                            <span className='rating wraper'>
                                <i className="fa-solid fa-star"></i>
                            </span>
                            Your Rating
                        </li> */}

                        <li className="ctions__item" >
                            <div  ref={refHeartCheck} className={`rating wraper  ${category==='movie' ? isActive ? 'active' : '' : isActiveTv ? 'active' : ''}`} onClick={(e) => {
                                if(category==='movie'){
                                    if(!refHeartCheck.current.classList.contains('active')){
                                        addMovieToFavourite(item);
                                    }else{
                                        removeMovieToFavourite(item.id);
                                        refHeartCheck.current.classList.remove('active');
                                    }
                                }else{
                                    if(!refHeartCheck.current.classList.contains('active')){
                                        addTvToFavourite(item);
                                    }else{
                                        removeTvToFavourite(item.id);
                                        refHeartCheck.current.classList.remove('active');
                                    }
                                }
                            }}>
                                <i className="fa-solid fa-heart"></i>
                            </div>
                            Favourite
                        </li>

                        <li className="actions__item" >
                            <span className='rating wraper' onClick={() => { 
                                if(category==='movie'){
                                    if(type==='watchlist'){
                                        removeMovieFromWatchlist(item.id)
                                    }else{
                                        removeMovieToFavourite(item.id)
                                    }
                                }else{
                                    if(type==='watchlist'){
                                        removeTvFromWatchlist(item.id)
                                    }else{
                                        removeTvToFavourite(item.id)
                                    }
                                }

                            }}>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                            Remove
                        </li>

                        <li className="actions__item">
                        <div  ref={refHeartCheck2} className={`rating wraper  ${category==='movie' ? isActive2 ? 'active' : '' : isActiveTv2 ? 'active' : ''}`} onClick={(e) => {
                                if(category==='movie'){
                                    if(!refHeartCheck2.current.classList.contains('active')){
                                        addMovieToWatched(item);
                                    }else{
                                        removeMovieFromWatched(item.id);
                                        refHeartCheck2.current.classList.remove('active');
                                    }
                                }else{
                                    if(!refHeartCheck2.current.classList.contains('active')){
                                        addTvToWatched(item);
                                    }else{
                                        removeTvFromWatched(item.id);
                                        refHeartCheck2.current.classList.remove('active');
                                    }
                                }
                            }}>
                                <i className="fa-solid fa-eye"></i>
                            </div>
                            Done
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MovieCardList