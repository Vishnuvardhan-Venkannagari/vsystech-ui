import React, { useState } from 'react'
import authservice from '../apiInterface/auth.js'
import { useParams } from "react-router-dom"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector} from "react-redux"
import { logIn as authLogin } from "../store/authSlice.js"
import './SignUp.css'

export default function ProfileUpdate() {
    const {id} = useParams()
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false) 
    const [loading, setLoading] = useState(false) 
    const dispatch = useDispatch()
    const authtoken = useSelector((state) => state.auth.authtoken)
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const sendUpdate = async (data) => {
        setError("")
        setIsSubmitting(true) 
        try {
            setLoading(true)
            data.id = id
            data.authtoken = authtoken
            const session = await authservice.profileUpdate(data)
            if (session) {
                const payload = {userData: session, authtoken: authtoken}
                console.log(payload)
                setIsSubmitting(false) 
                setLoading(false)
                dispatch(authLogin({ payload }))
                navigate("/")

            }
        } catch (error) {
            setError(error.message)
            setLoading(false)
        } finally {
            setIsSubmitting(false) 
            setLoading(false)
        }
    } 

  return (
    <div className='flex items-center justify-center w-full'>
        <div className='signup-container'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="signup-container-h2">Update your account</h2>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(sendUpdate)} className="mt-8">
                    <div >
                        <Input
                            label="Phone Number"
                            type="text"
                            className="w-full"
                            placeholder="Phone Number"
                            {...register("phoneNumber", { required: "Phone Number is required" })}
                            error={errors.password?.message} 
                        />
                        <Input
                            label="DOB"
                            type="text"
                            className="w-full"
                            placeholder="dd-mm-yyyy"
                            {...register("DOB", { required: "DOB is required" })}
                            error={errors.password?.message} 
                        />
                        <Input
                            label="Gender"
                            type="text"
                            className="w-full"
                            placeholder="Gender"
                            {...register("gender", { required: "Gender is required" })}
                            error={errors.password?.message} 
                        />
                        <Input
                            label="State"
                            type="text"
                            className="w-full"
                            placeholder="State"
                            {...register("state", { required: "State is required" })}
                            error={errors.password?.message}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
