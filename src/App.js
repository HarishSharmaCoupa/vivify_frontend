import React from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './container/Home'
import {GoogleOAuthProvider} from '@react-oauth/google'

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Routes>
        <Route path='login' element={ <Login />} />
        <Route path='/*' element={ <Home />} />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
