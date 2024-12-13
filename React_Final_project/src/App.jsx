import './App.css'
import React from 'react'
import Register from './Login&Register/Register'
import Login from './Login&Register/Login'
import { Routes, Route } from 'react-router-dom'
import Categories from './Admin/Categories'
import Products from './Admin/Products'
import Customers from './Admin/Customers'
import Statistics from './Admin/Statistics'
import MyAccount from './Customer/MyAccount'


function App() {


  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/customers' element={<Customers/>} />
      <Route path='/statistics' element={<Statistics/>} />
      <Route path='/MyAccount' element={<MyAccount/>} />
    </Routes>
  )
}

export default App
