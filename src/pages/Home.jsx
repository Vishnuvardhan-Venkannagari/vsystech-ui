import React, { useEffect, useState } from 'react'
// import appwrite from '../appwrite/AppwriteInterface'
import Container from "../components/container/Container"
// import PostCard from "../components/PostCard"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import Header from '../components/Header/Header'
import Login from './Login'
export default function Home() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const authStatus = useSelector((state) => state.auth.status)
  // const authUser = useSelector((state) => state.auth.userData)
  // if (!userData){
  //   navigate("/login")
  // }
  // useEffect(() => {
  //     // appwrite.get_all([]).then((posts) => {
  //       posts = [{}]
  //       if (posts){
  //         //here the posts is array so we want an array of post by post.document creates the 
  //         // array of documents of the post
  //         setPosts(posts.documents)
  //       }else{
  //         if (userData){
  //           navigate("/add-posts")
  //         }else{
  //           // navigate("/login")
  //           <div className='w-full py-8'>
  //             <Container>
  //               <div className="flex flex-wrap">
  //                 <h1>Login to read posts</h1>
  //               </div>
  //             </Container>
  //           </div>
  //         }
          
  //       }
  //     })
  // }, [])
  // if (posts.length === 0){
  //   navigate("/add-posts")
  // }
  return (
    <div className='w-full py-8'>
      {!authStatus && (
        <Login />
      )}
      
    </div>
  )
}
