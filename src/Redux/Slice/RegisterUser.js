import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const register= createAsyncThunk("register", async(data) => {
   const response = await axios.post("http://localhost:3001/users", data)
   const finalData = response.data
   return finalData
})


const registerUser = createSlice({
    name:"registerUser",
    initialState:{
        isAlert:false,
        isSuccess:false,
        registerUser:null
    },
    extraReducers:(builder) => {
        builder.addCase(register.pending, (state, action) => {
         state.isAlert = false
         state.isSuccess = false
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isAlert  = false
            state.isSuccess  =true
            state.registerUser = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isAlert = true
            state.isSuccess = false
        })
    }
})


export default registerUser.reducer