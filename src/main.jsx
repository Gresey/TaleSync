import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from './context/SessionContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </SessionProvider>
    
   
  </StrictMode>,
)
