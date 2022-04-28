import React from 'react'

import { useParams } from 'react-router'

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';

import MovieGrid from '../components/movie-grid/MovieGrid';

import {tvType, movieType} from '../api/tmdbApi'


const movieTypes = {
  upcoming: 'Up Coming',
  popular: 'Popular',
  top_rated: 'Top Rated'
}

const tvTypes = {
  top_rated: 'Top Rated',
  popular: 'Popular',
  on_the_air: 'Airing Today'
}

const Catalog = () => {
  const { category } = useParams();

  const {type} = useParams();

  const listTypes = category === cate.movie ? movieTypes : tvTypes;
  const listUrl = category === cate.movie ? movieType : tvType;
  return (
    <>
      <PageHeader listTypes={listTypes} listUrl={listUrl} category={category} >
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} type={type}/>
        </div>
      </div>
    </>
  )
}

export default Catalog