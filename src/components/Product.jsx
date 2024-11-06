import React, {useState} from 'react'
import "./Product.css"
import Button from "./Button.jsx"
import { useForm } from "react-hook-form"
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cartService from '../apiInterface/cart.js'
import { useSelector } from "react-redux"

export default function Product({prod}) {
  const { register, handleSubmit, formState: { errors } } = useForm() 
  const [isAdded, setIsAdded] = useState(false)
  const authtoken = useSelector((state) => state.auth.authtoken)

  const AddToCart = async() => {
    const input = {id: prod.id, authtoken: authtoken}
    const addcartresponse = await cartService.addtoCart(input)
    if (addcartresponse) {
      setIsAdded(true)
      return "Added to cart successfully"
    }
    else{
      setIsAdded(false)
      return "Error"
    }

  }

  const handleClose = () => {
    setIsAdded(false) 
  }

  return (
    <div className='product-container'>
      <img src={prod.img_url} alt="" className=''/>
      <div className="product-details">
        <h1>{prod.name}</h1>
        <p>{prod.short_description}</p>
        <h3>Price: ${prod.price}</h3>
        <Button type="submit" onClick={handleSubmit(AddToCart)}> 
        <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
          Add to Cart
        </Button>

        {isAdded && (
        <div className="modal">
          <div className="modal-content">
            <p>Added to cart successfully!</p>
            <Button type="submit" onClick={handleClose}>
              OK
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
