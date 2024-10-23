import conf from "../conf/conf.js";
import axios from "axios";

export class ProductInterface {
    api_url;
    constructor(){
        this.api_url = conf.apiUrl
    }

    async get_all(authtoken){
        try {
            const response = await axios.get("/api/products",{
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


const productservice = new ProductInterface()
export default productservice