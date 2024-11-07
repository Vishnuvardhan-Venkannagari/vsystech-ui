import React, {useState} from 'react'
import "./CartItem.css"


export default function CartItem({item}) {
  return (
    <div className='cart-container'>
      <img src={item.productData.img_url} alt="" className=''/>
      <div className="cart-details">
        <h1>{item.productData.name}</h1>
        <h3>Price: ${item.productData.price}</h3>
        <h2>Status: In Cart</h2>
      </div>
    </div>
  )
}
