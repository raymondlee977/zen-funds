import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext'
import { SidebarProvider } from './components/ui/sidebar'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
