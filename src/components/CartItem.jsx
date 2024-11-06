import React, {useState} from 'react'
import "./CartItem.css"
import Button from "./Button.jsx"
import { useForm } from "react-hook-form"
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cartService from '../apiInterface/cart.js'
import { useSelector } from "react-redux"


export default function CartItem({item}) {
  return (
    <div className='cart-container'>
      <img src={item.productData.img_url} alt="" className=''/>
      <div className="cart-details">
        <h1>{item.productData.name}</h1>
        <h3>Price: ${item.productData.price}</h3>
        <h2>Status: {item.status}</h2>
      </div>
    </div>
  )
}
