import React from 'react'
import { Navigate } from 'react-router-dom';

function Homeguard({isAuth, Component}) {
 const id = sessionStorage.getItem("id")
 if(!id){
  isAuth =false;
 }
  return (
    <>
      
          {isAuth === false? <Component />:<Navigate to="/"/>}
       
    </>
  )
}

export default Homeguard