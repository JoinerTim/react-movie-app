import React from 'react'

import { useState, useEffect, useCallback, useContext, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'


import tmdbApi from '../../api/tmdbApi'


import MovieCardList from '../movie-card-list/MovieCardList'

import Input from '../input/Input'
import MovieCard from '../movie-card/MovieCard'
import Button from '../button/Button'

import './mylist.scss'


const MyList = () => {

        const { type } = useParams();
        const [results, setResults] = useState([]);

        const refIconDown = useRef();
        const { category } = useParams();



        const [keyword, setKeyword] = useState('');

        const history = useNavigate();
        const goToSearch = useCallback(
                () => {
                        if (keyword.trim().length > 0) {
                                history(`/mylist/${category}/search/${keyword}`);
                        }
                },
                [keyword, category, history]
        );

        useEffect(() => {
                const enterEvent = (e) => {
                        e.preventDefault();
                        if (e.keyCode === 13) {
                                goToSearch();
                        }
                }
                document.addEventListener('keyup', enterEvent);
                return () => {
                        document.removeEventListener('keyup', enterEvent);
                };
        }, [keyword, goToSearch]);


        useEffect(() => {
                const getList = async () => {
                        let response = null;
                        if (keyword) {
                                const params = {
                                        query: keyword

                                }
                                response = await tmdbApi.search(category, { params });
                                setResults(response.results)
                        } else {
                                setResults([])
                        }
                }
                getList()
        }, [keyword, category])

        const { watchlist, watched, favourite, tvwatchlist, tvwatched, tvfavourite } = useContext(GlobalContext);
      

        const [icon, setIcon] = useState('down');

        useEffect(() => {
                if (refIconDown) {
                        refIconDown.current.classList.remove('showss')
                        setIcon('down')
                }
        }, [category])

        const handleClickDownChange = (e) => {
                refIconDown.current.classList.toggle('showss');
                if (icon === 'down') {
                        setIcon('up');

                } else {
                        setIcon('down')
                }
        }

        //watchlist


        return (
                <>
                        <div className="container" style={{marginTop:'7rem'}}>
                                <div className="title__header">
                                        <div className="title__header__group">
                                                <div className="title__header__group__name">
                                                        <Link to='#' className='eclips'>{category === 'movie' ? 'Movies' : "TV"} Watchlist</Link>
                                                        <div onClick={handleClickDownChange} className="title__header__group__name__icon">
                                                                <i className={`fa-solid fa-sort-${icon}`}></i>
                                                        </div>
                                                        <div ref={refIconDown} className="title__header__group__name__link">
                                                                <Link to={`/mylist/${category === 'movie' ? 'tv' : 'movie'}/watchlist`}>{category === 'movie' ? 'TV' : "Movies"} Watchlist</Link>
                                                        </div>
                                                </div>
                                                <div className="title__header__group__type">
                                                        <h3 className={`${type === 'watchlist' ? 'active' : ''} prevent__copys`}>
                                                                <Link to={`/mylist/${category}/watchlist`}>Watchlist</Link>
                                                                <span className='sum'> ({category === 'movie' ? watchlist.length : tvwatchlist.length}) </span>
                                                        </h3>
                                                        <h3 className={`${type === 'favourite' ? 'active' : ''} prevent__copys`}>
                                                                <Link to={`/mylist/${category}/favourite`}>Favourite</Link>
                                                                <span className='sum'> ({category === 'movie' ? favourite.length : tvfavourite.length}) </span>
                                                        </h3>
                                                </div>
                                                <div className="title__header__group__filters">
                                                        <div className="title__header__group__filters__name">
                                                                <h3>Filters: </h3>
                                                        </div>
                                                        <div className="title__header__group__filters__wrap">
                                                                <h3>{type ==='watched' ? 'Watched' : 'Normal'} <i className="fa-solid fa-sort-down"></i></h3>
                                                                <ul className="title__header__group__filters__wrap__type">
                                                                        <li className="title__header__group__filters__wrap__type__item">
                                                                                <Link to={`/mylist/${category}/${type ==='watched' ? 'watchlist' : 'watched'}`}>{type ==='watched' ? 'Normal' : 'Watched'}</Link>
                                                                        </li>
                                                                </ul>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* <div className="title__header__finding"> */}
                                                {/* <div className="select">
                                                        <Link to={`/mylist/${category}/${category === 'movie' ? 'movie' : 'tv'}`} className="select__movies">{category==="movie" ? "Movies " : "TV Shows"} <i className="fa-solid fa-angle-down"></i></Link>
                                                        <Link to={`/mylist/${category}/${category === 'movie' ? 'tv' : 'movie'}`} className="select__tv">{category==="movie" ? "TV Shows" : "Movies "}</Link>

                                                </div> */}
                                                {/* <Input
                                                        type="text"
                                                        placeholder={`${category === 'movie' ? "Movies Name" : 'TV Name'}`}
                                                        value={keyword}
                                                        onChange={(e) => { setKeyword(e.target.value) }}
                                                >
                                                </Input>
                                                <Button className="small" onClick={goToSearch}>Search</Button>
                                        </div> */}
                                </div>

                                <div className='movie-grid'>
                                        {
                                                results ? results.map((item, i) => <MovieCard category={category} item={item} key={i} />) : "Doesn't have that Movies / TV"
                                        }
                                </div>
                                <div className="container__watchlist">

                                        {
                                                category === 'movie' ?
                                                        type === 'watchlist' ? watchlist.length > 0 ? (watchlist.map((item, i) => (
                                                                <MovieCardList key={i} item={item} i={i} type={type} category={category} />
                                                        ))) :
                                                                <h2>No Movies/Tv in your watchlist.ADD NOW!</h2>
                                                                : type === 'watched' ? watched.length > 0 ? (
                                                                        watched.map((item, i) => (
                                                                                <MovieCardList key={i} item={item} i={i} type={type} category={category}></MovieCardList>
                                                                        ))) :
                                                                        <h2>No Movies/Tv in your watchlist.ADD NOW!</h2>
                                                                        : favourite.length > 0 ? (favourite.map((item, i) => (
                                                                                <MovieCardList key={i} item={item} i={i} type={type} />
                                                                        ))) :
                                                                                <h2>No Movies/Tv in your watchlist.ADD NOW!</h2>
                                                        :

                                                        type === 'watchlist' ? tvwatchlist.length > 0 ? (tvwatchlist.map((item, i) => (
                                                                <MovieCardList key={i} item={item} i={i} type={type} />
                                                        ))) :
                                                                <h2>No Movies/Tv in your watchlist.ADD NOW!</h2>
                                                                : type === 'watched' ? tvwatched.length > 0 ? (
                                                                        tvwatched.map((item, i) => (
                                                                                <MovieCardList key={i} item={item} i={i} type={type} category={category}></MovieCardList>
                                                                        ))) :
                                                                        <h2>No Movies/Tv in your watchlist.ADD NOW!</h2>
                                                                        : tvfavourite.length > 0 ? (tvfavourite.map((item, i) => (
                                                                                <MovieCardList key={i} item={item} i={i} type={type} />
                                                                        ))) :
                                                                                <h2>No Movies/Tv in your watchlist.ADD NOW!</h2>
                                        }
                                </div>

                        </div>
                </>

        )
}

export default MyList

