import { data } from "autoprefixer";
import conf from "../conf/conf.js";
import axios from "axios";
export class AuthInterface {
    api_url;
    constructor(){
        this.api_url = conf.apiUrl
    }

    async logIn(body){
        try {
            const response = await fetch(this.api_url + "/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            email: body.email,
                            password: body.password
                        }
                    )
                }
            );
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
            }
        } catch (error) {
            console.log("Error in LoginEmail", error)
        }
    }

    async logOut(){
        try {
            return null
        } catch (error) {
            console.log("Appwrite logOut", error)
        }
    }

    async getCurrentUser(){}
}

const authservice = new AuthInterface()
export default authservice