import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import './castlist.scss'

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import { SwiperSlide, Swiper } from 'swiper/react'

const CastList = props => {

    const { category } = useParams();


    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id)
            setCasts(res.cast.slice(0, 5))
        }
        getCredits()
    }, [category, props.id])

    return (
        <div className='casts container'>
                {casts.map((item, i) => (
                        <div key={i} className="casts__item">
                            <div className="casts__item__img"
                                style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}></div>

                            <p className='casts__item__name'>{item.name}</p>
                            <p className='casts__item__character'>{item.character}</p>
                        </div>
                ))}
        </div>
    )
}

export default CastList