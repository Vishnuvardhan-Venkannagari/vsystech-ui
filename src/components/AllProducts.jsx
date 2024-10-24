import React, { useState, useEffect } from 'react'
import productservice from '../apiInterface/products.js'
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
// import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { logIn as authLogin } from "../store/authSlice.js"
import Product from './Product'
import Container from "./container/Container"
import authservice from '../apiInterface/auth.js'

export default function AllProducts() {
    // const navigate = useNavigate()
    const [error, setError] = useState("")
    const [prods, setProds] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false) // New state for tracking submission
    // const dispatch = useDispatch()
    // const { register, handleSubmit, formState: { errors } } = useForm() // Destructure formState
    const authStatus = useSelector((state) => state.auth.status)
    const authtoken = useSelector((state) => state.auth.authtoken)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError("")
            // setIsSubmitting(true)
            try {
                const productResponse = await productservice.get_all(authtoken)
                console.log(productResponse);
                if (productResponse) setProds(productResponse)
                    setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error("Error fetching products:", error.message) 
                setError(error.message)
            }
        }
    if (authStatus) {
        fetchProducts()
        setLoading(false)
    }
    }, [authStatus, authtoken])
    
    return (
        <div className='w-full'>
            <Container>
            <div className='flex flex-wrap'>
                {loading && 
                    <img src='/Users/vishnureddy/Documents/MyProjects/vsystech-ui/FrontEnd-UI/loding.png' />
                }
                {
                prods.map((prod) => (
                    // console.log(prod)
                    <div className="p-2 w-1/4" key={prod.id}>
                    <Product post={prod} />
                    </div>
                ))
                }
            </div>
            </Container>
      </div>
  )
}
