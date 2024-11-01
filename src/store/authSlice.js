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
            state.status = action.payload.payload.status !== undefined ? action.payload.payload.status : true;
            state.userData = action.payload.payload.userData
            state.authtoken = action.payload.payload.authtoken
        },
        logOut: (state) => {
            state.status = false
            state.userData = null
            state.authtoken = null
        }
    }
})

export const { logIn, logOut } = authSlicer.actions
export default authSlicer.reducer 