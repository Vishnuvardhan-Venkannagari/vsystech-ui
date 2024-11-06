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
}


const cartService = new CartInterface()
export default cartService