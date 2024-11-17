import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import authservice from '../apiInterface/auth.js'
import { useSelector } from "react-redux"
import "./UserProfile.css"
import Button from "./Button.jsx"

export default function UserProfile() {
  const {id} = useParams()
  const [error, setError] = useState("")
  const [profileData, setProfileData] = useState({})
  const [loading, setLoading] = useState(false) 
  // const dispatch = useDispatch()
  const authtoken = useSelector((state) => state.auth.authtoken)
  const { register, handleSubmit, formState: { errors } } = useForm() 
  const handleClose = () => {
    setError("") 
  }
  useEffect(() => {
      const fetchUser = async() => {
          setError("")
          setLoading(true) 
          try {
            const getUser = await authservice.getUserProfile({id: id, authtoken: authtoken})
            if (getUser) setProfileData(getUser)
            setLoading(false) 
          } catch (error) {
            setLoading(false)
            console.error("Error fetching user:", error.message) 
            setError(error.message)
          }
      }
    if (id) fetchUser()
  }, [id, authtoken])
      // {/* <h1>Full Name: {profileData.name}</h1> */}

  return (
    <div className="profile-container">
        <div class="container rounded bg-white mt-5 mb-5">
          {loading && <img src='../../loading.png' alt=""/>}
          <img src={profileData.profilePicture} alt="" />
          
          <div class="text-center">
            <span class="font-weight-bold">
              <h2>{profileData.firstName + " " + profileData.lastName}</h2>
              <h2>{profileData.email}</h2>
            </span> 
          </div>
          <div class="button-center">
            <Button type="submit" onClick={handleSubmit(handleClose)}> 
              Upload Photo 
            </Button>
          </div>
          
          <h1>First Name: {profileData.firstName }</h1>
          <h1>Last Name: {profileData.lastName}</h1>
          <h1>Email Address: {profileData.email}</h1>
          <h1>Gender: Male</h1>
          <h1>Phone Number: {profileData.phoneNumber}</h1>
          <h1>State: {profileData.state}</h1>
          <h1>Country: {profileData.country}</h1>
        </div>
    </div>
  )
}
