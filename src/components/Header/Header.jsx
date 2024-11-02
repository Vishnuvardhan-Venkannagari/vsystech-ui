import React from 'react'
import Container from "../container/Container"
// import Logo from '../Logo'
import { Link } from 'react-router-dom'
import LogOutBtn from './LogOutBtn'
import UserProfile from '../UserProfile'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const authData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const naveItems = [
        {
            name: "Home",
            endPoint: "/",
            active: authStatus

        },
        {
            name: "LogIn ",
            endPoint: "/login",
            active: !authStatus

        },
        {
            name: "SignUp",
            endPoint: "/signup",
            active: !authStatus

        },
        {
            name: "Profile",
            endPoint: `/user/${authData?.user_id}`, // Dynamic profile endpoint
            active: authStatus
        }
    ]
  return (
    <header className='py-3 shadow bg-customGold flex items-center justify-between'>
        <Container>
            {/* <h1 class="text-bold text-xl uppercase font-bold">VSYS TECH</h1> */}
            
            
            <nav className='flex items-center'>
                <div className='mr-4'>
                    {/* <Link>
                        <Logo />
                    </Link> */}
                </div>
                {/* <h1 className="absolute inset-x-0 text-center font-bold text-5xl text-white mx-auto">
                    VSYS TECH
                </h1> */}
                {/* <h1 className="text-center font-bold text-5xl text-white mx-auto flex ml-auto">
                    VSYS TECH
                </h1> */}

                <ul className='flex ml-auto'>
                    {
                        naveItems.map((items) => items.active ? (
                            <li key={items.name}>
                                <button onClick={() => navigate(items.endPoint)} className='inline-block px-6 py-2 duration-200 bg-customHeaderButtonColor hover:bg-blue-100 rounded-full mx-1 text-white font-bold'>
                                    {items.name}
                                </button>
                            </li>
                        ) : null)
                    } 
                    {authStatus && (
                        <li>
                            <LogOutBtn />
                        </li>
                        // background-color: #6a11cb
                    )}
                </ul>
            </nav>
        </Container>
    </header>
  )
}
