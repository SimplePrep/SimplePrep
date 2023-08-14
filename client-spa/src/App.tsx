import React from 'react'
import { Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Blog from './pages/Blog'
import Product from './pages/Product'
import Tutorials from './pages/Tutorials'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/tutorials" element={<Tutorials />}></Route>
      </Routes>
    </div>
  )
}

export default App