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
                return data
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

    async signUp(){
        try {
            const response = await fetch(this.api_url + "/users/createUSer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        email: body.email,
                        password: body.password,
                        name: body.fullName,
                        dob: body.DOB,
                        phoneNumber: body.phoneNumber,
                        state: body.state
                    }
                )
            }
        );
        if (response.status === 200) {
            const data = await response.json()
            return data
        }
        } catch (error) {
            console.log("Error in SignUp", error)
        }
    }
    async getCurrentUser(data){
        const me = await fetch(this.api_url + "/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": data
            }
        });
        if (me.status === 200) return await me.json()
        return {}
    }
}

const authservice = new AuthInterface()
export default authservice