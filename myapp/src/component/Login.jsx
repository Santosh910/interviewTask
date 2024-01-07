import React, { useState } from 'react'
import api from './AxiosCofig'
import { useContext } from 'react'
import { AuthContex } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

const Login = () => {
    const [userData,setUserData] =useState({email:"",password:""})

    const router = useNavigate()

    const {Login} = useContext(AuthContex)

    const handleChange =(event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }

    const sendData= async(event)=>{
        event.preventDefault();
        if(userData.email && userData.password){
            try{
                const response = await api.post("/auth/login",{userData})
                if(response.data.success){
                    localStorage.setItem("my-token",(response.data.token))
                    Login(response.data.user)
                    toast.success("login successfull")
                    setUserData({email:"",password:""})
                    router('/')
                }
            }catch(error){
                 toast.error(error?.response.data.message)
            }
        }else{
            alert("all data is mandotory")
        }
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={sendData} style={{marginBottom:"100px"}}>
            <label>Email:</label><br />
            <input type="email" name='email' onChange={handleChange}/> <br />
            <label>Password:</label><br />
            <input type="password" name='password' onChange={handleChange} /><br />
            <input type="submit" value="Login here" />
        </form>

        <button onClick={()=>router('/register')}>Sign up</button>
    </div>
  )
}

export default Login