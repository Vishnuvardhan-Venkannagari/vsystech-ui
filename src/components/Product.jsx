import React, {useState, useEffect} from 'react'
import "./Product.css"
import Button from "./Button.jsx"
import { useForm } from "react-hook-form"
import { faCartPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cartService from '../apiInterface/cart.js'
import { useSelector } from "react-redux"

export default function Product({prod}) {
  const { register, handleSubmit, formState: { errors } } = useForm() 
  const [isAdded, setIsAdded] = useState(false)
  const authtoken = useSelector((state) => state.auth.authtoken)
  const authData = useSelector((state) => state.auth.userData)
  const [inCart, setInCart] = useState(false) 
  
  useEffect(() => {
    const checkcart = async() =>{
      const input2 = {prod_id: prod.id, authtoken: authtoken, uid: authData.user_id}
      const fromCart =  await cartService.checkInCart(input2)
      console.log(fromCart.data.length !== 0)
      if (fromCart.data && fromCart.data.length !== 0) {setInCart(true)}
    }
    if (prod.id) checkcart()
  }, [prod.id, authtoken])

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
        
        {
          inCart ? 
          <Button type="submit" onClick={handleSubmit(AddToCart)} disabled={inCart}>  
            <FontAwesomeIcon icon={faCartShopping} className="mr-2"  />  Incart
          </Button>
          : 
          <Button type="submit" onClick={handleSubmit(AddToCart)} disabled={inCart}>  
            <FontAwesomeIcon icon={faCartPlus} className="mr-2"  />  Add to Cart
          </Button>
        }

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
