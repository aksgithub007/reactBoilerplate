import { createSlice } from "@reduxjs/toolkit"


const initialAuthState = {
    isOpen:false,
    isAuth:Boolean(sessionStorage.getItem("email")),
    user:{}
}

const Authslice = createSlice({
    name:"Auth",
    initialState:initialAuthState,
    reducers:{
        login (state, action)  {
        state.isAuth = true
        state.user=action.payload
        },
        logout (state)  {
         state.isAuth = false
        },
        sidebarOpen(state){
            state.isOpen = true
        },
        sidebarClose(state){
            state.isOpen = false
        }

    }
})

export const Authaction =Authslice.actions

export default Authslice