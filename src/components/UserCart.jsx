import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import cartService from '../apiInterface/cart.js'
import Container from "./container/Container"
import CartItem from "./CartItem.jsx"
import "./UserCart.css"
import { useForm } from "react-hook-form"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
import AddressForm from './AddressForm.jsx'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function UserCart() {
  const authtoken = useSelector((state) => state.auth.authtoken)
  const authStatus = useSelector((state) => state.auth.status)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm() 
  const [takeAddress, setTakeAddress] = useState(false);
  
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  useEffect(() => {
    const fetchCart = async() => {
      try {
        setLoading(false)
        const cartResponse = await cartService.getUserCart(authtoken)
        // console.log(cartResponse)
        if (cartResponse) {
          setCartItems(cartResponse)
          setTotalItems(cartResponse.length)
          let addPrice = 0
          cartResponse.map((item) => {
            addPrice = addPrice + item.productData.price
          })
          setTotalPrice(addPrice)
        }
      } catch (error) {
        console.error("Error fetching carts:", error.message) 
      }
    }
    if (authStatus) {
      fetchCart()
      // setLoading(false)
    }
  }, [authtoken])

  const handleOpenAddressForm = () => {
    setTakeAddress(true);
    // window.open('/AddressForm', '_blank', 'width=600,height=400');

  }
  
  return (
    <div className="w-full">
      {loading ? (
        <img src="../../loading.png" alt="Loading..." /> // Loading indicator
      ) : cartItems.length > 0 ? (
        <Container>
          <div className="w-full grid grid-cols-2 gap-2">
            {cartItems.map((item) => (
              <div className="p-2 w-full" key={item.id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <div className='price-container'>
            <h1>Total Items Selected: </h1>
            <h2>{totalItems}</h2>
            
            {/* {takeAddress && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <AddressForm />
                </div>
              </div>
            )} */}
          </div>
          <div className='price-container'>
            <h1>Total Price: </h1>
            <h3>{totalPrice}</h3>
          </div>
          <div className='button-container'>
            <Button type="submit" onClick={handleOpenAddressForm} className="mr-2">
              <FontAwesomeIcon icon={faCreditCard} />
              Proceed to Buy
            </Button>
          </div>

        </Container>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p> // Fallback for empty cart
      )}
    </div>
  );
}
