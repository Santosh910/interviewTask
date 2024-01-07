import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import api from './AxiosCofig';

const Register = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" })

    const router = useNavigate();
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.password) {
            try {
                const response = await api.post('/auth/register', { userData })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setUserData({ name: "", email: "", password: "" })
                    router('/login')
                }
            } catch (error) {
                toast.error(error?.message)
            }
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label><br />
                <input type="text" name='name' onChange={handleChange}/> <br />
                <label>Email:</label><br />
                <input type="email" name='email' onChange={handleChange} /><br />
                <label>Password:</label><br />
                <input type="password" name='password' onChange={handleChange}  /> <br />
                <input type="submit" value="register here" /><br />
            </form>
        </div>
    )
}

export default Register