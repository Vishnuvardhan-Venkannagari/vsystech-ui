import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import cartService from '../apiInterface/cart.js'
import Container from "./container/Container"
import CartItem from "./CartItem.jsx"
import "./UserCart.css"

export default function UserCart() {
  const authtoken = useSelector((state) => state.auth.authtoken)
  const authStatus = useSelector((state) => state.auth.status)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCart = async() => {
      try {
        setLoading(false)
        const cartResponse = await cartService.getUserCart(authtoken)
        // console.log(cartResponse)
        if (cartResponse) setCartItems(cartResponse)
      } catch (error) {
        console.error("Error fetching carts:", error.message) 
      }
    }
    if (authStatus) {
      fetchCart()
      // setLoading(false)
    }
  }, [authtoken])
  
  return (
    <div className="w-full">
      {loading ? (
        <img src="../../loading.png" alt="Loading..." /> // Loading indicator
      ) : cartItems.length > 0 ? (
        <Container>
          <div className="w-1/2">
            {cartItems.map((item) => (
              <div className="p-2 w-full" key={item.id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p> // Fallback for empty cart
      )}
    </div>
  );
}
