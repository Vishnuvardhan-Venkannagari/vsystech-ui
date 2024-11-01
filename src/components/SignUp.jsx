import React, { useState } from 'react'
import authservice from '../apiInterface/auth.js'
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
// import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { logIn as authLogin } from "../store/authSlice.js"
import './SignUp.css'

export default function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false) 
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm() 

    const sendSignUp = async (data) => {
        setError("")
        setIsSubmitting(true) 
        try {
            const session = await authservice.signUp(data)
            if (session) {
                navigate(`/user/profile/${session.user_data.user_id}`)
                const payload = {userData: session.user_data, authtoken: session.authtoken, status: false}
                // console.log(payload)
                dispatch(authLogin({ payload }))
                // navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsSubmitting(false) 
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
        <div className='signup-container'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="signup-container-h2">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(sendSignUp)} className="mt-8">
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
                        <Input
                            label="First Name"
                            type="text"
                            className="w-full"
                            placeholder="First Name"
                            {...register("firstName", { required: "First Name is required" })}
                            error={errors.firstName?.message}
                        />
                        <Input
                            label="Last Name"
                            type="text"
                            className="w-full"
                            placeholder="Last Name"
                            {...register("lastName", { required: "First Name is required" })}
                            error={errors.lastName?.message}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}> {/* Disable while submitting */}
                            {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
