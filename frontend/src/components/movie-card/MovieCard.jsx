import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {





    const item = props.item;
    const { addMovieToWatchlist, addTvToWatchlist, watchlist, tvwatchlist } = useContext(GlobalContext);

    const isStored = watchlist.find(o => o.id === item.id);
    const isAvtice = isStored ? true : false

    const isStoredtv = tvwatchlist.find(o => o.id === item.id);
    const isAvticetv = isStoredtv ? true : false


    var link = item.poster_path || item.backdrop_path ? '/' + category[props.category] + '/' + item.id + `/${item.name ? item.name.replace(/\s/g, '-') : item.title.replace(/\s/g, '-')}` : "#";
    if (item.poster_path || item.backdrop_path) {

        var bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    }
    return (
        <div className="wrap-something">
            <Link to={link}>
                <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>

                    <button className="movie-card__add"

                        onClick={(e) => {
                            e.preventDefault();

                            if (!isAvtice && !isAvticetv) {
                                toast.success("Your action was successfully!");
                                if (item.poster_path || item.backdrop_path) {
                                    if (props.category === 'movie')
                                     { addMovieToWatchlist(item) }
                                    else {
                                        addTvToWatchlist(item)
                                    }
                                }
                            } else {
                                toast.error("You have already done it!");
                            }
                        }}>

                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                </div>
                <h3>{item.title || item.name}</h3>
            </Link>
        </div>
    );
}

export default MovieCard;