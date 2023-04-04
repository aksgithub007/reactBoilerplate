import React, {useEffect, useState} from 'react'
import LoginForm from '../components/Login/LoginForm'
import axios from "axios"
import { Authaction } from '../Redux/reducers/Authreducer'
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { alert } from '../components/SharedComponents/alert';

function Login() {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const stateData = useSelector(state=> console.log(state.user, "user Info in redux"))
const  dispatch = useDispatch()

  useEffect(() => {
  const getUserList = async() => {
   const userInfo = await axios.get("http://localhost:3001/users")
   const finalUserInfo = userInfo.data
   console.log(finalUserInfo,"User Info")
   setUserList(finalUserInfo)
  }
  getUserList()
  }, [])
  const save = async (formdata) => {
    console.log( formdata, "infos");
    if(formdata.email !=="" && formdata.password !==""){
      const logedInUser = userList.find((user) => {
        // console.log(user.email === formdata.email)
        return user.email=== formdata.email && user.password === formdata.password
      })
      console.log(logedInUser,"LogedInUserInfo")
      if(typeof logedInUser === "object"){
        sessionStorage.setItem("id",logedInUser?.id )
        sessionStorage.setItem("email",logedInUser?.email )
        sessionStorage.setItem("mobile",logedInUser?.mobile )
        sessionStorage.setItem("firstName",logedInUser?.firstName )
        sessionStorage.setItem("lastName",logedInUser?.lastName )
        sessionStorage.setItem("avatar",logedInUser?.image[0]?.data_url )
       
          
        
        dispatch(Authaction.login(logedInUser))
        navigate('/')
        alert("success",'User is successfully Login')
       
      }else{
          // sessionStorage.removeItem("userName")
          sessionStorage.clear()
        navigate('/login')
       
        alert("warning",'User Credential Is Mismatch. Enter Correct Information')
      }
    }else{
      navigate('/login')
      
      alert("error",'Please Enter Information Here')
    }
      
    
  
  };
  return (
    <>
    <LoginForm onSave={save} />
    </>
  )
}

export default Login