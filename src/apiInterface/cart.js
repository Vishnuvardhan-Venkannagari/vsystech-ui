import { json } from "react-router-dom";
import conf from "../conf/conf.js";
import axios from "axios";

export class CartInterface {
    
    async addtoCart(data) {
        const add_to_cart_req = await fetch("/api/cart/addToCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": data.authtoken
            },
            body: JSON.stringify(
                {
                    product_id: data.id
                }
            )
        })
        if (add_to_cart_req.status === 200){
            const respone =  await add_to_cart_req.json()
            return respone
        }
        return {}
    }
    async getUserCart(authtoken){
        try {
            const response = await axios.get("/api/cart/getCartItem",{
                headers: {
                    "authtoken": authtoken ,
                    'Content-Type': 'application/json'
                }
            }
                
            )
            const products = response.data; 
            return products.data
        } catch (error) {
            console.log("Error occured", error.message)
            return []
        }
        
    }

    async removeItemFromCart(data){
        try {
            const reqRemoveCartItem = await fetch("/api/cart/removeCartItem", {
                method: "POST",
                headers: {
                    "authtoken": data.authtoken ,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        cart_item_id: data.cart_item_id
                    }
                )
            }
                
            )
            if (reqRemoveCartItem.status === 200){
                const respone =  await reqRemoveCartItem.json()
                return respone
            }
            return {}
        } catch (error) {
            console.log("Error occured", error.message)
            return []
        }
        
    }

    async checkInCart(data){
        try {
            const queryParams = new URLSearchParams({q: JSON.stringify({
                "userData.uid": data.uid,
                "productData.id": data.prod_id,
                "status": 'InCart'
            })}).toString();

            const response = await fetch(`/api/cart?${queryParams}`,{
                method: "GET",
                headers: {
                    "authtoken": data.authtoken ,
                    'Content-Type': 'application/json'
                },
                
            }
                
            )
            if (response.status === 200){
                const respone1 =  await response.json()
                return respone1
            }
        } catch (error) {
            console.log("Error occured", error.message)
            return []
        }
        
    }

    async createPaymentOrder(data){
        try {
            console.log(data)
            const createOrder = await fetch("/api/payments/createPayment", {
                method: "POST",
                headers: {
                    "authtoken": data.authtoken ,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        gateway_name: data.gateway_name
                    }
                )
            })
            if (createOrder.status === 200){
                return await createOrder.json()
            }
            return {}
        } catch (error) {
            console.log("Error occured", error.message)
            return []
        }
    }
}


const cartService = new CartInterface()
export default cartService