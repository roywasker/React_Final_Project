import './App.css'
import React from 'react'
import Register from './Login&Register/Register'
import Login from './Login&Register/Login'
import { Routes, Route } from 'react-router-dom'
import Categories from './Admin/Categories'


function App() {


  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/categories' element={<Categories/>} />
    </Routes>
  )
}

export default App
