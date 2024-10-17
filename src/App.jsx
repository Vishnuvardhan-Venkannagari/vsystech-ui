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
  return!loading ?  (
    <>
      {/* <div className='w-full min-h-screen flex flex-wrap content-between bg-gray-500'> */}
      <div className='w-full block min-h-screen  flex-wrap content-between bg-gray-500'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    {/* </div> */}
    </>
  ) : null
} 

export default App
