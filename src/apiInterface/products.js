import conf from "../conf/conf.js";
import axios from "axios";

export class ProductInterface {
    api_url;
    constructor(){
        this.api_url = conf.apiUrl
    }

    async get_all(authtoken){
        try {
            console.log(authtoken)
            // const products = await fetch(this.api_url + "/products", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "authtoken": authtoken 
            //     },
            // // mode: 'cors'
            // }
            // );
            // if (products.status === 200) return await products.json()
            const response = await axios.get("/api/products",{
                headers: {
                    "authtoken": authtoken ,
                    'Content-Type': 'application/json'
                }
            }
                
            )
            const products = response.data; // axios automatically parses JSON
            console.log(products);
        } catch (error) {
            console.log("Error occured", error.message)
            return []
        }
        
    }
}


const productservice = new ProductInterface()
export default productservice