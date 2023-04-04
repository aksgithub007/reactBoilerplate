import React, {useEffect, useState}  from 'react'
import RegisterForm from '../components/Register/RegisterForm'
import axios from "axios"
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom"
import {alert} from '../components/SharedComponents/alert'
import {useSelector, useDispatch} from "react-redux"
import { register } from '../Redux/Slice/RegisterUser';


function Register() {
  const dispatch = useDispatch()
  const state = useSelector(state => console.log(state))
  const registerInfo = useSelector(state => state.register)
  const [open, setOpen] = useState(false);
const navigate= useNavigate()


useEffect(() => {
  if(registerInfo.isSuccess){
    navigate("/login")
    alert('success','User is successfully created')
  }
  if(registerInfo.isAlert){
    alert('error','Internal server error')
  }
}, [registerInfo])

  // const postData = (formdata) => {
  //   axios
  //     .post("http://localhost:3001/users", formdata)
  //     .then((resp) => {
  //       console.log(resp, "upadeFacilityType");

  //       alert('success','User is successfully created')
  //       navigate('/login')
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert('error','Internal server error')
  //     });
  // };
 
  const save = async (formdata) => {
    console.log(formdata.id, formdata, "infos");
    //  const response =  await postData(formdata);
    //  console.log(response,"response")
    dispatch(register(formdata))
  };
  return (
    <>
  
    <RegisterForm  onSave={save}/>
    </>
  )
}

export default Register