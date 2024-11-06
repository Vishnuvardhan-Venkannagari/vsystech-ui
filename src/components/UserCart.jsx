import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import cartService from '../apiInterface/cart.js'
import Container from "./container/Container"
import CartItem from "./CartItem.jsx"
export default function UserCart() {
  const authtoken = useSelector((state) => state.auth.authtoken)
  const authStatus = useSelector((state) => state.auth.status)
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    const fetchCart = async() => {
      try {
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
    <div className='w-full'>
            {/* {loading && <img src='../../loading.png' alt=""/>} */}
            <Container>
            <div className='flex flex-wrap w-1/2'>
                { cartItems.map((item) => (
                    <div className="p-2 w-full" key={item.id}>
                    <CartItem item={item} />
                    </div> 
                ))}
            </div>
            </Container>
      </div>
  )
}
