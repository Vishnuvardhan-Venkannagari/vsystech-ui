import React, {useState} from 'react'
import "./CartItem.css"
import { useForm } from "react-hook-form"
import Button from "./Button.jsx"
import cartService from '../apiInterface/cart.js'
import { useSelector } from "react-redux"
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export default function CartItem({item}) {
    const { register, handleSubmit, formState: { errors } } = useForm() 
    const authtoken = useSelector((state) => state.auth.authtoken)
    const [isRemoved, setIsRemoved] = useState(false)
    const navigate = useNavigate();
    const RemoveFromCart = async() => {
        const input = {cart_item_id: item.id, authtoken: authtoken}
        const removeCartResponse = await cartService.removeItemFromCart(input)
        console.log(removeCartResponse)
        setIsRemoved(true)
        return "Removed from cart successfully"
    }
    const handleClose = () => {
        setIsRemoved(false) 
        window.location.reload()
        navigate('/');

      }
  return (
    <div className='cart-container'>
      <img src={item.productData.img_url} alt="" className=''/>
      <div className="cart-details">
        <h1>{item.productData.name}</h1>
        <h3>Price: ${item.productData.price}</h3>
        <h2>Status: In Cart</h2>
        <Button type="submit" onClick={handleSubmit(RemoveFromCart)}>
        <FontAwesomeIcon icon={faDeleteLeft} className="mr-2" />
            Remove from Cart
        </Button>
        {isRemoved && (
            <div className="modal">
              <div className="modal-content">
                  <p>Removed from cart successfully!</p>
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
