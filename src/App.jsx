import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/landingpage'
import LoginPage from './components/Login/login';
import { Route,Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard/dashboard';
import Gallery from './components/Gallery/gallery';
import AddJournal from './components/Journal/newjournalpage';

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/dashboard/:code' element={<Dashboard/>}/>
          <Route path='/dashboard/journal' element={<AddJournal/>}/> 
          <Route path='/gallery' element={<Gallery/>}/>
        </Routes>
      
      </div>
     
    </>
  )
}

export default App
