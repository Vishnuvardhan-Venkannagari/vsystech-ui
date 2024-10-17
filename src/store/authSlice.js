import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: null
};


const authSlicer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.status = true
            state.userData = action.payload.payload.userData
            state.authToken = action.payload.payload.authToken
        },
        logOut: (state) => {
            state.status = false
            state.userData = null
            state.authToken = null
        }
    }
})

export const { logIn, logOut } = authSlicer.actions
export default authSlicer.reducer 