import {configureStore} from "@reduxjs/toolkit"
import Register from "./Slice/RegisterUser"
import Authslice from "./reducers/Authreducer"



const store = configureStore({
    reducer:{
        Auth:Authslice.reducer,
        register : Register,

    
    }
})

export default store