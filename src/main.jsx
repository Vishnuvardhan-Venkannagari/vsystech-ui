import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthLayout from './components/AuthLayout.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProductData from './pages/ProductData.jsx'
import UserProfile from "./pages/UserProfile.jsx"
import UserCart from './pages/UserCart.jsx'
import ProfileUpdate from './components/ProfileUpdate.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          )
        },
        {
          path: "/product/:prodId",
          element: (
            <AuthLayout authentication>
              <ProductData />
            </AuthLayout>
          )
        },
        {
          path: "/user/:id",
          element: (
            <AuthLayout authentication>
              <UserProfile />
            </AuthLayout>
          )
        },
        {
          path: "/user/profile/:id",
          element: (
            <AuthLayout authentication={false}>
              <ProfileUpdate />
            </AuthLayout>
          )
        },
        {
          path: "/cart",
          element: (
            <AuthLayout authentication={false}>
              <UserCart />
            </AuthLayout>
          )
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 // </StrictMode>,
)
