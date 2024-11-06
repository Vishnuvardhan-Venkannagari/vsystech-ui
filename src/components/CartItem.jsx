import React, {useState} from 'react'
import "./Product.css"
import Button from "./Button.jsx"
import { useForm } from "react-hook-form"
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cartService from '../apiInterface/cart.js'
import { useSelector } from "react-redux"


export default function CartItem({item}) {
    console.log(item)
  return (
    <div className='product-container'>
      <img src={item.img_url} alt="" className=''/>
      <div className="product-details">
        <h1>{prod.name}</h1>
        <h3>Price: ${prod.price}</h3>
      </div>
    </div>
  )
}
