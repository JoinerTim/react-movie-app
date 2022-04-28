import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { SupportDetail } from '../pages/detail/Detail'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import MyList from '../components/mylist/MyList'
import Search from '../components/search/Search'

import Person from '../components/person/Person'


import PrivateRoute from '../components/routing/PrivateRoute'
const Routess = () => {

  return (
    <Routes>


      <Route path='/' element={<PrivateRoute />} />

      <Route
        path="/:category/search/:keyword"
        element={<Catalog />}
      />

      <Route
        path="/mylist/:category/search/:keyword"
        element={<MyList />}
      />


      <Route
        path="/:category/:id/:name"
        element={<SupportDetail />}
      />

      <Route
        path="/:category/:type"
        element={<Catalog />}
      />


      <Route
        path="/:category"
        element={<Catalog />} />

      <Route
        path="/mylist/:category/:type"
        element={<MyList />}
      />

      <Route
        path='/person'
        element={<Person />}
      />

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path='/search/:category/:keyword'
        element={<Search />}
      />

    </Routes>
  )
}

export default Routess