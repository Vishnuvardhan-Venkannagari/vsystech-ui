import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import cartService from '../apiInterface/cart.js'
import Container from "./container/Container"
import CartItem from "./CartItem.jsx"
import "./UserCart.css"
import { useForm } from "react-hook-form"
import Button from "./Button.jsx"
import { Link, useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()
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
    setTakeAddress(true)
    return "Clicked on logout succesfully"
  }
  const handleClose = () => {
    setTakeAddress(false) 
  }

  const createOrderWithPaypal = async() => {
    const data = {gateway_name: "PayPal", authtoken: authtoken}
    const getOrderDetails = await cartService.createPaymentOrder(data)
    console.log(getOrderDetails)
    if (getOrderDetails) {
      console.log(window.location.origin)
      const ws = new WebSocket(`wss://app.vsystech.net/ws/${getOrderDetails.order_id}`);
      console.log(ws)
      // window.location.href = getOrderDetails.approve_url
      var newWindow = window.open(getOrderDetails.approve_url, '_blank');
      // const ws = new WebSocket(`ws://app.vsystech.net/ws/${getOrderDetails.order_id}`);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data)
        // newWindow.close()
        if (data.status === 'success') {
          console.log("Closing new window as the payment is completed.");
          console.log(newWindow)
          if (newWindow && !newWindow.closed) {
              newWindow.close();
              console.log(newWindow)
          }
          if (newWindow) {
            setTimeout(() => {
                newWindow.close();
                console.log("Window closed status after delay:", newWindow.closed);
            }, 1000); // Delay for 1 second
        }
        }
      }
    }
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
            {/* <Button type="submit" onClick={handleOpenAddressForm} className="mr-2">
              <FontAwesomeIcon icon={faCreditCard} />
              Proceed to Buy
            </Button> */}
            <button 
              onClick={handleOpenAddressForm}
              className='inline-block px-6 py-2 duration-200 bg-customGold hover:bg-customPurple mx-1 rounded-full text-white font-bold'>
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                Proceed to Buy
            </button>
          </div>
          {
            takeAddress && (
              <div className="modal">
                <div className="modal-content">
                  <p>Do you want to purchase?</p>
                  <Button type="submit" onClick={createOrderWithPaypal}>
                  {/* <FontAwesomeIcon icon={faPaypal} className="mr-2" /> */}
                    Buy With PayPal
                  </Button> 
                  <button type="submit" onClick={handleClose}>
                    No
                  </button>
                </div>
              </div>
            )
          }
        </Container>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p> // Fallback for empty cart
      )}
    </div>
  );
}
