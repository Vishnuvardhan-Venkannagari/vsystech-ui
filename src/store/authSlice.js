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
            const { payload } = action;
            // state.status = action.payload.payload.status !== undefined ? action.payload.payload.status : true;
            state.status = payload?.status || false;
            state.userData = payload?.userData || null;
            state.authtoken = payload?.authtoken || null;
        },
        logOut: (state) => {
            state.status = false
            state.userData = null
            state.authtoken = null
        },
        setAuth: (state, action) => {
            state.status = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.authtoken = action.payload
        }
        
    }
})

export const { logIn, logOut, setAuth, setUser, setToken } = authSlicer.actions
export default authSlicer.reducer 