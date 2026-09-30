import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="758348217582-tm3jrdqr4p6jf00do8iohdndqc9690qs.apps.googleusercontent.com">
      <AppWrapper />
    </GoogleOAuthProvider>
  </StrictMode>,
)
