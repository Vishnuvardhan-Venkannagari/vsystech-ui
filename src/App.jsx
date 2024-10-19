import { useState, useEffect } from 'react'
import authservice from './apiInterface/auth.js'
// import { logOut } from '../../store/authSlice.js'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import { useDispatch } from "react-redux"
import { logIn, logOut } from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() =>{
    authservice.getCurrentUser().then((userData) => {
      if (userData) dispatch(logIn(userData))
      else dispatch(logOut())
    }).finally(() => setLoading(false))
  }, [dispatch])
  
return !loading ? (
  <div className='min-h-screen flex flex-col'>
    <Header />
    <main className='flex-grow pt-20 bg-gray-500'>
      <Outlet />
    </main>
  </div>
) : null;
}

export default App
