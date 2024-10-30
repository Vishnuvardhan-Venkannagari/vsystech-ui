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
            });
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

    async signUp(body){
        try {
            const response = await fetch("/api/users/createUser", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            email: body.email,
                            password: body.password,
                            name: body.fullName,
                            phoneNumber: body.phoneNumber,
                            dob: body.DOB,
                            state: body.state,
                            profilePicture: " "
                        }
                    )
            })
            if (response.status === 200) {
                const data = await response.json()
                if (data.status === "success") return data.data
                return {}
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

    async getUserProfile(data){
        console.log(data.authtoken)
        const user = await fetch(`/api/users/${data.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": data.authtoken
            }
        })
        if (user.status === 200) return await user.json()
        return {}
    }
}

const authservice = new AuthInterface()
export default authservice