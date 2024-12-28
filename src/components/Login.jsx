import React, { useState } from 'react'
import authservice from '../apiInterface/auth.js'
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { logIn as authLogin } from "../store/authSlice.js"
import './Login.css'
import loading from '../../loading.png'

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false) 
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    // const [loading, setLoading] = useState(false)
    const [isLoading, setisLoading] = useState(true);

    const login = async (data) => {
        setError("")
        setIsSubmitting(true) 
        try {
            const session = await authservice.logIn(data)
            setisLoading(true)
            if (session) {
                const currentUser = await authservice.getCurrentUser(session.token)
                const payload = {userData: currentUser, authtoken: session.token}
                let prefix  
                const host = window.location.hostname
                if (host === "localhost") {
                    prefix = "dev_"
                }
                else{
                    prefix = "prod_"
                }
                sessionStorage.setItem(`${prefix}authtoken`, session.token);
                sessionStorage.setItem(`${prefix}userData`, JSON.stringify(currentUser));
                if (currentUser) {
                    dispatch(authLogin({ payload }))
                    navigate("/")
                }else{
                    sessionStorage.removeItem(`${prefix}authtoken`);
                    navigate("/login")
                }
            }
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            setError(error.message)
        } finally {
            setisLoading(false)
            setIsSubmitting(false)
        }
    }
    
    return (
        <div className='flex items-center justify-center w-full py-8'>
            <div className='login-container'>
                {/* {loading && 
                <img src='/Users/vishnureddy/Documents/MyProjects/vsystech-ui/FrontEnd-UI/loding.png' />
                } */}
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <h2 className="login-container-h2">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div >
                            <Input
                                label="Email"
                                placeholder="Email Address"
                                className="w-full"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                error={errors.email?.message}
                            />
                            <Input
                                label="Password"
                                type="password"
                                className="w-full"
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                                error={errors.password?.message}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}> {/* Disable while submitting */}
                                {isSubmitting ? "Signing in..." : "Sign in"}
                            </Button>
                            <div className='py-2 text-center'>
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary transition-all duration-200 hover:underline "
                                >
                                    Forgot Password
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}