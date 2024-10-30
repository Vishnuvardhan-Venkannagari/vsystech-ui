import React from 'react'
import { useDispatch } from "react-redux"
import authservice from '../../apiInterface/auth.js'
import { logOut } from '../../store/authSlice.js'



export default function LogOutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logOut().then(() => {
            dispatch(logOut())
        })
    }
  return (
    <button 
    onClick={logoutHandler}
    className='inline-block px-6 py-2 duration-200 bg-customHeaderButtonColor hover:bg-blue-100 mx-1 rounded-full text-white font-bold'>
        Log Out
    </button>
  )
}
