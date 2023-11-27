import React from 'react'
import './App.css'
import Dashboard from './Components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Questions from './Components/Questions'

function App() {

  return (
  <>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Dashboard/>} />
  <Route path="/questions/:categoryId" element={<Questions />} />  </Routes>
  
    
  
  </BrowserRouter>
  </>
  )
}

export default App

