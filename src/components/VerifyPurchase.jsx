import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { logIn, logOut } from "./store/authSlice"
import { setAuth, setUser } from "./store/authSlice.js" 

export default function VerifyPurchase() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem('authtoken')
        if (token) {
            const user = JSON.parse(localStorage.getItem('userData'))
            dispatch(setAuth(true))  
            dispatch(setUser(user))  
            const payload = {userData: user, authtoken: token, status: true}
            dispatch(logIn(payload))
            setLoading(false)
        }

    }, [dispatch, location])
  return (
    <div>verifyPurchase</div>
  )
}
