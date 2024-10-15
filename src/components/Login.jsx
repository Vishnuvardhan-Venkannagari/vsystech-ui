import React, { useState } from 'react'
import authservice from '../apiInterface/auth.js'
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
// import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { logIn as authLogin } from "../store/authSlice.js"
import './Login.css'

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false) // New state for tracking submission
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm() // Destructure formState

    const login = async (data) => {
        setError("")
        setIsSubmitting(true) // Set submitting state to true
        try {
            const session = await authservice.logIn(data)
            if (session) {
                const currentUser = await authservice.getCurrentUser()
                if (currentUser) dispatch(authLogin({ currentUser }))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsSubmitting(false) // Reset submitting state after the attempt
        }
    }

    return (
        
            <div className='body-container'>
                <div className='login-container'>
                    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                        {/* <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[100px]">
                                <Logo width="100%" />
                            </span>
                        </div> */}
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
                                    error={errors.email?.message} // Pass error message
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    className="w-full"
                                    placeholder="Password"
                                    {...register("password", { required: "Password is required" })}
                                    error={errors.password?.message} // Pass error message
                                />
                                <Button type="submit" className="w-full" disabled={isSubmitting}> {/* Disable while submitting */}
                                    {isSubmitting ? "Signing in..." : "Sign in"}
                                </Button>
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary transition-all duration-200 hover:underline"
                                >
                                    Forgot Password
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}


{/* <div className="flex items-center justify-center w-full">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    {/* <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div> */}
                //     <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                //     <p className="mt-2 text-center text-base text-black/60">
                //         Don&apos;t have any account?&nbsp;
                //         <Link
                //             to="/signup"
                //             className="font-medium text-primary transition-all duration-200 hover:underline"
                //         >
                //             Sign Up
                //         </Link>
                //     </p>
                //     {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                //     <form onSubmit={handleSubmit(login)} className="mt-8">
                //         <div className="space-y-5">
                //             <Input
                //                 // label="Email : "
                //                 placeholder="Email Address"
                //                 type="email"
                //                 {...register("email", {
                //                     required: "Email is required",
                //                     pattern: {
                //                         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                //                         message: "Invalid email address"
                //                     }
                //                 })}
                //                 error={errors.email?.message} // Pass error message
                //             />
                //             <Input
                //                 // label="Password : "
                //                 type="password"
                //                 placeholder="Password"
                //                 {...register("password", { required: "Password is required" })}
                //                 error={errors.password?.message} // Pass error message
                //             />
                //             <Button type="submit" className="w-full" disabled={isSubmitting}> {/* Disable while submitting */}
                //                 {isSubmitting ? "Signing in..." : "Sign in"}
                //             </Button>
                //         </div>
                //     </form>
                // </div>
            // </div> */}