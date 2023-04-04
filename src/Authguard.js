import { Box } from '@mui/material'
import React from 'react'
import Navbar from './components/Navbar'
import Sidenav from './components/Sidenav'
import {Navigate} from "react-router-dom";
function Authguard({Component, isAuth}) {
    const id = sessionStorage.getItem("id")
    if(id){
        isAuth =true;
       }
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          {isAuth === true? <Component/>:<Navigate to="/login"/>}
          </Box>
       
      </div>
    </>
  )
}

export default Authguard