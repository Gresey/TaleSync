import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/landingpage'
import { Route,Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard/dashboard';
import AddJournal from './components/Journal/newjournalpage';
import ProtectedRoute from './ProtectedRoute';
import Gallery from './components/Gallery/gallery';
import SharedGoals from './components/Shared Goals/shared_goals';

function App() {


  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/dashboard/:code' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }/>
            <Route path='/gallery' element={
              <ProtectedRoute>
                <Gallery/>
              </ProtectedRoute>
            }/>
          <Route path='/dashboard/journal' element={
            <ProtectedRoute>
              <AddJournal/>
              </ProtectedRoute>
            }/> 
            <Route path='/dashboard/sharedgoals/:code' element={
            <ProtectedRoute>
              <SharedGoals/>
            </ProtectedRoute>
          
          }/>
          </Routes>
      
      </div>
     
    </>
  )
}

export default App
