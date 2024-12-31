import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/landingpage'
import LoginPage from './components/Login/login';
import { Route,Router,Routes } from "react-router-dom";

import Dashboard from './components/Dashboard/dashboard';

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/landing' element={<LandingPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      
      </div>
     
    </>
  )
}

export default App
