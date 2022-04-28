import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import MovieCard from '../movie-card/MovieCard'
import "./movie-list.scss"

import { SwiperSlide, Swiper } from 'swiper/react'
import tmdbApi, { category } from '../../api/tmdbApi'

// import { Scrollbar } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/a11y/a11y.min.css';




import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

function MovieList(props) {
    const [items, setItems] = useState([])
    useEffect(() => {
        const getList = async () => {
            let response = null
            const params = {}
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        // response = await tmdbApi.getMoviesList(props.type, { params })
                        if (props.type === 'trending') {
                            response = await tmdbApi.getTrending(props.type, category.movie, props.time, { params });
                        } else if (props.type === 'now_playing') {
                            response = await tmdbApi.getPlaying(category.movie, props.type, { params });
                        }
                        else {
                            response = await tmdbApi.getMoviesList(props.type, { params })
                        }
                        break
                    default:
                        if (props.type === 'trending') {
                            response = await tmdbApi.getTrending(props.type, category.tv, props.time, { params });
                        } else {
                            response = await tmdbApi.getTvList(props.type, { params })

                        }
                        break
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id)
            }
            setItems(response.results)
        }
        getList()
    }, [props.category, props.id, props.type, props.time])


    return (
        <div>
            <div className="movie-list">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    // scrollbar={{ draggable: true }}
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    // // navigation
                    // pagination={{ clickable: true }}
                >
                    {items.map((item, i) => (
                            <SwiperSlide key={i}>
                                <MovieCard item={item} category={props.category} />
                            </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList