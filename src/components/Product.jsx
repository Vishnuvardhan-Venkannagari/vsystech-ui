import React from 'react'
import "./Product.css"
export default function Product({prod}) {
  console.log("Inside prods",prod)
  return (
    <div className='product-container'>
      <img src={prod.img_url} alt="" className=''/>
      <div className="product-details">
        <h1>{prod.name}</h1>
        <p>{prod.short_description}</p>
        <h3>Price: ${prod.price}</h3>
      </div>
    </div>
  )
}
