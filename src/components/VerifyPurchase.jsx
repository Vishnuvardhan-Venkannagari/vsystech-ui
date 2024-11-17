import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { logIn, logOut } from "../store/authSlice"
import { setAuth, setUser } from "../store/authSlice.js" 
import cartService from '../apiInterface/cart.js'
export default function VerifyPurchase() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const location = useLocation();
    
    useEffect(() => {
        const authtoken = localStorage.getItem('authtoken')
        const {token} = useParams()
        const {PayerID} = useParams()
        if (authtoken) {
            const user = JSON.parse(localStorage.getItem('userData'))
            dispatch(setAuth(true))  
            dispatch(setUser(user))  
            const payload = {userData: user, authtoken: authtoken, status: true}
            dispatch(logIn(payload))
            setLoading(false)
            
        }
        const verify = async() => {
          const getVerifyDetails = await cartService.verifyPayment({authtoken: authtoken, payment_id: token})
          console.log(getVerifyDetails)
        }

    }, [dispatch, location])
  return (
    <div>verifyPurchase</div>
  )
}
