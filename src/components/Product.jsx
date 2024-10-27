import React from 'react'
import "./Product.css"
export default function Product({prod}) {
  console.log("Inside prods",prod)
  return (
    <div className='product-container'>
      <h1>{prod.name}</h1>
      <img src={prod.img_url} alt=""/>
      <p>{prod.short_description}</p>
      <h3>Price: ${prod.price}</h3>
    </div>
  )
}
