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
import paymentSuccessImage from "../../payment_success_image.png"
import paymentFailIcon from "../../payment_fail_icon.png"
import loading from '../../loading.png'
import { FaStar, FaStarHalfAlt, FaRegStar, FaCreditCard, FaLock } from 'react-icons/fa';

export default function UserCart() {
  const authtoken = useSelector((state) => state.auth.authtoken)
  const authStatus = useSelector((state) => state.auth.status)
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setisLoading] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm() 
  // const [clickedPayNow, setclickedPayNow] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const navigate = useNavigate()
  const [subTotal, setsubTotal] = useState(0)
  const [totlaPrice, setTotlaPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [tax, setTax] = useState(0)
  const shippingPrice = 5
  const paypal_fee_percent = 0.029
  const fixed_fee = 0.30
  const [paypal_fee, setpaypal_fee] = useState(0)
  const [paymentFailed, setPaymentFailed] = useState(false)

  useEffect(() => {
    const fetchCart = async() => {
      try {
        setisLoading(false)
        const cartResponse = await cartService.getUserCart(authtoken)
        if (cartResponse) {
          setCartItems(cartResponse)
          setTotalItems(cartResponse.length)
          let addPrice = 0
          cartResponse.map((item) => {
            addPrice = addPrice + item.productData.price
          })
          setsubTotal(addPrice)
          const calculatedTax = parseFloat((addPrice * 0.075).toFixed(2));
          const calculatedPayPalFee = parseFloat((addPrice * paypal_fee_percent + fixed_fee).toFixed(2));
          setTax(calculatedTax)
          setpaypal_fee(calculatedPayPalFee)
          const calculatedTotalPrice = parseFloat((addPrice + calculatedTax + calculatedPayPalFee + 5).toFixed(2))
          setTotlaPrice(calculatedTotalPrice)
        }
      } catch (error) {
        console.error("Error fetching carts:", error.message) 
      }
    }
    if (authStatus) {
      fetchCart()
      // setisLoading(false)
    }
  }, [authtoken])

  const handlePaymentSuccessClose = () => {
    setisLoading(false)
    setIsPurchased(false) 
    window.location.reload()

  }
  const handlePaymentFailedClose = () => {
    setisLoading(false)
    setPaymentFailed(false) 
    window.location.reload()
  }


  const createOrderWithPaypal = async() => {
    setisLoading(true)
    const data = {gateway_name: "PayPal", authtoken: authtoken, orderPrice: totlaPrice}
    const getOrderDetails = await cartService.createPaymentOrder(data)
    console.log(getOrderDetails)
    if (getOrderDetails) {
      // const myorigin = window.location.origin
      const ws = new WebSocket(`wss://app.vsystech.net/ws/${getOrderDetails.order_id}`);
      // window.location.href = getOrderDetails.approve_url
      var newWindow = window.open(getOrderDetails.approve_url, '_blank');
      console.log(ws)
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data)
        if (data.status === 'success') {
          console.log("Closing new window as the payment is completed.");
          console.log(newWindow)
          if (newWindow && !newWindow.closed) {
              newWindow.close();
              console.log(newWindow)
              // setclickedPayNow(false)
              setisLoading(false)
              setIsPurchased(true)
          }
        }
        if (data.status === 'failed') {
          console.log("Closing new window as the payment is completed.");
          console.log(newWindow)
          setisLoading(false)
          setPaymentFailed(true)
          if (newWindow && !newWindow.closed) {
              newWindow.close();
              console.log(newWindow)
              // setclickedPayNow(false)
              // setIsPurchased(true)
          }
        }
      }
    }
  }
  const isLoadingCancel = () => {
    setisLoading(false) 
    window.location.reload()

    // newWindow.close()
    // console.log(newWindow)
  }
  
  return (
    <div className="w-full">
      {cartItems.length > 0 ? (
        <Container>
          <div className="w-full grid grid-cols-2 gap-2">
            {cartItems.map((item) => (
              <div className="p-2 w-full" key={item.id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-10">Order Summary</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shippingPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Paypal Fee</span>
                <span>${paypal_fee}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${totlaPrice}</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center mb-7"
            onClick={createOrderWithPaypal}
          >
            <FaLock className="mr-2" /> Place Order With PayPal
          </Button>
          {
            isLoading && (
              <div className="modal">
                <div className="modal-content">
                  <img src={loading} alt='Payment loading...' />
                  <p>Your payment is loading...</p>
                  <Button type="submit" onClick={isLoadingCancel}>
                    cancel
                  </Button>
                </div>
              </div>
            )
          }
          {
            isPurchased && (
              <div className="modal">
                <div className="modal-content">
                  <img src={paymentSuccessImage} alt='Payment Success...' />
                  <h1 class="text-2xl font-bold">Thank You for Your Order!</h1>
                  <p class="text-gray-600 mt-2">Your order has been successfully placed. Keep an eye on your inbox for updates.</p>
                  <Button type="submit">
                    View Orders
                  </Button>
                  <Button type="submit" onClick={handlePaymentSuccessClose}>
                    Close
                  </Button>
                </div>
              </div>
            )
          }
          {
            paymentFailed && (
              <div className="modal">
                <div className="modal-content">
                  {/* <img src='../../payment_success_image.png' alt="Payment Success..." /> */}
                  <img src={paymentFailIcon} alt='Payment failed...' />
                  <p>Your payment is failed</p>
                  <Button type="submit" onClick={createOrderWithPaypal}>
                    Try Again...
                  </Button>
                  <Button type="submit" onClick={handlePaymentFailedClose}>
                    Close
                  </Button>
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
