import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/landingpage'
import LoginPage from './components/Login/login';
import { Route,Router,Routes } from "react-router-dom";

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/' element={<LandingPage/>}/>
        </Routes>
      
      </div>
     
    </>
  )
}

export default App
