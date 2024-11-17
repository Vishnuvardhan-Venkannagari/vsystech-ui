import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAuth, setUser } from "../store/authSlice" 
import { useDispatch } from "react-redux"
export default function AuthLayout({children, authentication=true}) {
  const authStatus = useSelector((state) => state.auth.status)  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loader ,setLoader] = useState()
  useEffect(() => {
    const token = localStorage.getItem('authtoken')
    if (token) {
      const user = JSON.parse(localStorage.getItem('userData'))
      dispatch(setAuth(true))  // Set authentication status to true
      dispatch(setUser(user))  // Set the user info in Redux store
    }
    if (authentication && authStatus !== authentication){
      navigate("/login")
      setLoader(false);
    } else if(!authentication && authStatus !== authentication){
      navigate("/")
      setLoader(false);
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])
  return loader ? null : <>{children}</>
}


