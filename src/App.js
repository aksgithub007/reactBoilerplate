import React, { useEffect } from 'react';
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import Datatables from './pages/Datatables';
import Authguard from './Authguard';
import Homeguard from './Homeguard';
import ManageCalenderView from './pages/ManageCalenderView';



export default function App() {
  const state = useSelector(state => state)



  
  return (
   <>
    <BrowserRouter>
      <Routes>
        
          <>
          <Route path="/" exact element={<Authguard Component={Home} isAuth = {state.Auth.isAuth} />}></Route>
          <Route path="/analytics" exact element={<Authguard Component={Analytics} isAuth = {state.Auth.isAuth} />}></Route>
          <Route path="/profile" exact element={<Authguard Component={Settings} isAuth = {state.Auth.isAuth}/>}></Route>
          <Route path="/calender" exact element={<Authguard Component={ManageCalenderView} isAuth = {state.Auth.isAuth}/>}></Route>
          {/* <Route path="/datatables" exact element={state.Auth.isAuth ? <Datatables /> : <Navigate to="/login" />}></Route> */}
          <Route path="/register" exact element={<Homeguard Component={Register} isAuth = {state.Auth.isAuth}/>}></Route>
          <Route path="/login" exact element={<Homeguard Component={Login} isAuth = {state.Auth.isAuth}/>}></Route>
          <Route path="/reset-password" exact element={<Homeguard Component={ForgotPassword} isAuth = {state.Auth.isAuth}/>}></Route>
          <Route path = "*" element={state.Auth.isAuth ? <Navigate to="/" />: <Navigate to="/login" />}></Route>
          </>

      </Routes>
    </BrowserRouter>
   </>
  )
}
