import React, { useState, useEffect } from 'react'
import authservice from '../apiInterface/auth.js'
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
// import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { logIn as authLogin } from "../store/authSlice.js"
import './Login.css'

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false) 
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(user));
    // })

    const login = async (data) => {
        setError("")
        setIsSubmitting(true) 
        try {
            const session = await authservice.logIn(data)
            setLoading(true)
            if (session) {
                const currentUser = await authservice.getCurrentUser(session.token)
                const payload = {userData: currentUser, authtoken: session.token}
                // localStorage.setItem('authtoken', session.token);
                // const isauth = sessionStorage.setItem('user', session.token)
                // console.log(currentUser, isauth)
                if (currentUser) {
                    dispatch(authLogin({ payload }))
                    // localStorage.setItem('user', session.token);
                    // isauth = sessionStorage.setItem('user', session.token)
                    // console(isauth, userData)
                    // if (!isauth) navigate('/login')
                    navigate("/")
                }else{
                    localStorage.removeItem('authToken');
                    navigate("/login")
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        } finally {
            setLoading(false)
            setIsSubmitting(false)
        }
    }
    
    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     console.log(token)
    //     if (token) {
    //         authservice.getCurrentUser(token).then((currentUser) => {
    //             if (currentUser) {
    //                 dispatch(authLogin({ userData: currentUser, authtoken: token }));
    //             } else {
    //                 localStorage.removeItem('authToken');
    //             }
    //         });
    //     }
    // }, [dispatch]);

    return (
        <div className='flex items-center justify-center w-full py-8'>
            <div className='login-container'>
                {loading && 
                <img src='/Users/vishnureddy/Documents/MyProjects/vsystech-ui/FrontEnd-UI/loding.png' />
                }
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