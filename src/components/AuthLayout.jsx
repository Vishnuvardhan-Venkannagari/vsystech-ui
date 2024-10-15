import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function AuthLayout({children, authentication=true}) {
  const authStatus = useSelector((state) => state.auth.status)  
  const navigate = useNavigate()
  const [loader ,setLoader] = useState()
  useEffect(() => {
    if (authentication && authStatus !== authentication){
      navigate("/login")
      setLoader(false);
    }else if(!authentication && authStatus !== authentication){
      navigate("/")
      setLoader(false);
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])
  return loader ? null : <>{children}</>
}


