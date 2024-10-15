import React from 'react'
import Container from "../container/Container"
// import Logo from '../Logo'
import { Link } from 'react-router-dom'
import LogOutBtn from './LogOutBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const naveItems = [
        {
            name: "Home",
            endPoint: "/",
            active: true

        },
        {
            name: "Log In ",
            endPoint: "/login",
            active: !authStatus

        },
        {
            name: "SignUp",
            endPoint: "/signup",
            active: !authStatus

        }
    ]
  return (
    <header className='py-3 shadow bg-gray-500'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    {/* <Link>
                        <Logo />
                    </Link> */}
                </div>
                <ul className='flex ml-auto'>
                    {
                        naveItems.map((items) => items.active ? (
                            <li key={items.name}>
                                <button onClick={() => navigate(items.endPoint)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                    {items.name}
                                </button>
                            </li>
                        ) : null)
                    } 
                    {authStatus && (
                        <li>
                            <LogOutBtn />
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
    </header>
  )
}
