import React from 'react'
import Input from "./Input.jsx"
import { useForm } from "react-hook-form"

export default function AddressForm() {
    const { register, handleSubmit, formState: { errors } } = useForm() 
  return (
    <div >
        <Input
            label="Address Line"
            placeholder="Address Line"
            className="w-full"
            type="address"
            {...register("address_line", {
                required: "Address Line required",
                pattern: {
                    // value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    // message: "Invalid email address"
                }
            })}
            error={errors.address_line?.message}
        />
        <Input
            label="City"
            placeholder="City"
            className="w-full"
            type="city"
            {...register("city", {
                required: "City Line required",
                pattern: {
                }
            })}
            error={errors.city?.message}
        />
        <Input
            label="State"
            placeholder="State"
            className="w-full"
            type="state"
            {...register("state", {
                required: "State Line required",
                pattern: {
                }
            })}
            error={errors.state?.message}
        />
        <Input
            label="Country"
            placeholder="Country"
            className="w-full"
            type="country"
            {...register("country", {
                required: "Country Line required",
                pattern: {
                }
            })}
            error={errors.state?.message}
        />
        <Input
            label="ZipCode"
            placeholder="Zip Code"
            className="w-full"
            type="zipcode"
            {...register("zipcode", {
                required: "ZipCode Line required",
                pattern: {
                }
            })}
            error={errors.state?.message}
        />
    </div>
  )
}
