import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { OutLineButton } from '../components/button/Button'
import HeroSlide from '../components/hero-slide/HeroSlide'
import MovieList from '../components/movie-list/MovieList'
import { category } from '../api/tmdbApi'
import Support from '../components/support/Support'



import './home.scss'

const Home = () => {

  const refSetMvToday = useRef();
  const refSetMvThisWeek = useRef();

  const refSetTvToday = useRef();
  const refSetThisTvWeek = useRef();

  const [types, setTypes] = useState();
  const [times, setTimes] = useState();

  const [typesTv, setTypestv] = useState();
  const [timesTv, setTimesTv] = useState();


  const handleOnClickMvToday = (e) => {
    e.preventDefault();
    setTypes('trending');
    setTimes('day');
    refSetMvThisWeek.current.classList.remove('show');
    refSetMvToday.current.classList.add('show');
  }

  const handleOnClickMvWeek = (e) => {
    e.preventDefault();
    setTypes('trending');
    setTimes('week');
    refSetMvToday.current.classList.remove('show');
    refSetMvThisWeek.current.classList.add('show');
  }


  const handleOnClickTvToday = (e) => {
    e.preventDefault();
    setTypestv('trending');
    setTimesTv('day');
    refSetThisTvWeek.current.classList.remove('show');
    refSetTvToday.current.classList.add('show');
  }
  const handleOnClickTvWeek = (e) => {
    e.preventDefault();
    setTypestv('trending');
    setTimesTv('week');
    refSetTvToday.current.classList.remove('show');
    refSetThisTvWeek.current.classList.add('show');
  }

  const handleClickScrollTop = () => {
    document.body.scrollTop(0);
    document.documentElement.scrollTop(0);
  }
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <div className="header__trending">
              <h2>Movies Trending</h2>
              <div className="heading__trending__cores">
                <div ref={refSetMvToday} className="heading__trending__cores__today show" onClick={handleOnClickMvToday}>
                  Today
                </div>
                <div ref={refSetMvThisWeek} className="heading__trending__cores__thisweek" onClick={handleOnClickMvWeek}>
                  This Week
                </div>
              </div>
            </div>
            <Link to="/movie/popular" onClick={handleClickScrollTop}>
              <OutLineButton className="small">
                View more
              </OutLineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={types ? types : 'trending'} time={times ? times : 'day'} />
        </div>


        <div className="section mb-3">
          <div className="section__header mb-2">
            <div className="header__trending">
              <h2>TV Trending</h2>
              <div className="heading__trending__cores">
                <div ref={refSetTvToday} className="heading__trending__cores__today show" onClick={handleOnClickTvToday}>
                  Today
                </div>
                <div ref={refSetThisTvWeek} className="heading__trending__cores__thisweek" onClick={handleOnClickTvWeek}>
                  This Week
                </div>
              </div>
            </div>
            <Link to="/tv/popular" onClick={handleClickScrollTop}>
              <OutLineButton className="small">
                View more
              </OutLineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={typesTv ? typesTv : 'trending'} time={timesTv ? timesTv : 'day'} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Movies Playing Now</h2>
            <Link to="/movie/popular" onClick={handleClickScrollTop}>
              <OutLineButton className="small">
                View more
              </OutLineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type='now_playing' />
        </div>

        {/* <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending</h2>
            <Link to="/tv/popular">
              <OutLineButton className="small">
                View more
              </OutLineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div> */}

        {/* <div className="section mb-3">
            <div className="section__header mb-2">
              <h2>Top Rated TV</h2>
              <Link to="/tv">
                <OutLineButton className="small">
                  View more
                </OutLineButton>
              </Link>
            </div>
            <MovieList category={category.tv} type={tvType.top_rated}/>
          </div>  */}
      </div>
      <Support />
    </>
  )
}

export default Home