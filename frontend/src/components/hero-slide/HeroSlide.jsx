import React, { useState, useEffect, useRef, useCallback } from 'react'

import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Modal, { ModalContent } from '../modal/Modal'


import { Link, useNavigate } from 'react-router-dom'

import tmdbApi, { movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import './hero-slide.scss'

const HeroSlide = () => {

  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(response.results.slice(5, 8));
      } catch {
        console.log('error');
      }
    }
    getMovies();
  }, []);


  return (
    <div className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      // autoplay={{ delay: 7000 }}
      >
        {
          movieItems.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
      {
        movieItems.map((item, i) => <TrailerModal key={i} item={item} />)
      }
    </div>
  )
}

const HeroSlideItem = props => {

  const item = props.item;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_patch)
  const link = '/' + 'movie' + '/' + item.id + `/${item.name ? item.name.replace(/\s/g, '-') : item.title.replace(/\s/g, '-')}`;

  let isEnglishs = localStorage.getItem('language') ? false : true


  const history = useNavigate();
  const [keyword, setKeyword] = useState('');
  const goToSearch = useCallback(
    () => {
      if (keyword.trim().length > 0) {
        history(`/search/movie/${keyword}`);
      } else if (keyword === '') {
        history(`/`);
      }
    },
    [keyword, history]
  );

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13 && keyword !== '') {
        goToSearch();
      }
    }
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        {
          isEnglishs ? <div className="hero-slide__item__content__register">
            <h1 >Unlimited movies, TV shows, and more.</h1>
            <h3>Watch anywhere. Cancel anytime.</h3>
            <form method="GET">
              <div className="webflow-style-input">
                <input onChange={(e) => { setKeyword(e.target.value);}} type="email" placeholder="What's the next ?"></input>
                <button onClick={(e) => { e.preventDefault(); goToSearch()}} type="submit"><i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </form>
          </div> :
            <div className="hero-slide__item__content__register">
              <h1 >Không giới hạn phim, Tivi và hơn thế nữa.</h1>
              <h3>Tiện dụng mọi lúc mọi nơi.</h3>
              <form method="GET">
                <div className="webflow-style-input">
                  <input type="email" placeholder="Bạn muốn xem gì ?" value={keyword}
                    onChange={(e) => { setKeyword(e.target.value);}}></input>
                  <button onClick={(e) => { e.preventDefault(); goToSearch()}} type="submit"><i className="fa-solid fa-arrow-right"></i></button>
                </div>
              </form>
            </div>
        }
        <Link className='fix-display' to={link} style={{ position: 'relative', zIndex: 100000 }}>
          <div className="hero-slide__item__content__poster">
            <img src={apiConfig.w500Image(item.poster_path)} alt="" />
          </div>
        </Link>
      </div>
    </div>
  )
}

const TrailerModal = props => {
  const item = props.item;
  const iFrameRef = useRef(null);
  const onClose = () => iFrameRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iFrameRef} width="100%" height="500px" title='trailer'></iframe>
      </ModalContent>
    </Modal>
  )
}
export default HeroSlide