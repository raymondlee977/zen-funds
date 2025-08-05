import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext'
import { SidebarProvider } from './components/ui/sidebar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Provider store={store}>
            <SidebarProvider>
                <App />
            </SidebarProvider>
        </Provider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
