import { useState, useEffect } from 'react'
import authservice from './apiInterface/auth.js'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { logIn, logOut } from "./store/authSlice"
import { setAuth, setUser, setToken } from "./store/authSlice.js" 
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() =>{
    let prefix
    const host = window.location.hostname
    if (host === "localhost") {
        prefix = "dev_"
    }
    else{
        prefix = "prod_"
    }
    const token = sessionStorage.getItem(`${prefix}authtoken`)
    if (token) {
      const user = JSON.parse(sessionStorage.getItem(`${prefix}userData`))
      dispatch(setAuth(true))  
      dispatch(setUser(user)) 
      dispatch(setToken(token))  
      const payload = {userData: user, authtoken: token, status: true}
      dispatch(logIn(payload))
      setLoading(false)
    } else{
    authservice.getCurrentUser().then((userData) => {
      if (userData) {dispatch(logIn(userData))}
      else {
        dispatch(logOut())
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    }).finally(() => setLoading(false))}
  }, [dispatch, navigate, location])
  
return !loading ? (
  <div className='min-h-screen flex flex-col'>
    <Header />
    <main className='flex-grow pt-20 bg-gray-100'>
      <Outlet />
    </main>
  </div>
) : null;
}

export default App
