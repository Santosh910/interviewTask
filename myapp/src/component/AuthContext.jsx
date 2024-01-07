import { createContext, useEffect, useReducer } from "react";
import {toast} from 'react-hot-toast'
import api from "./AxiosCofig";

export const AuthContex = createContext()
const reducer = (state,action)=>{
    switch(action.type){
        case "LOGIN":
            return{...state,user:action.payload}
        case "LOGOUT":
            return {...state,user:null}
        default:
            return state;
    }
}


const ParentContext = ({children})=>{
    const initialState = ({user:null})
    const [state,dispatch] = useReducer(reducer,initialState)

    const Login = (data)=>{
        dispatch({type:"LOGIN",payload:data})
    }

    const Logout=()=>{
        localStorage.removeItem("my-token")
        dispatch({type:"LOGOUT"})
        toast.success("Logout successfull...")
    }

    useEffect(()=>{
        async function getCurrentUser(){
            try{
                const response = await api.post('/auth/get-user',{token})
                if(response.data.success){
                    Login(response.data.user)
                }

            }catch(error){
                toast.error(error.response.data.message)
            }
        }
        const token =localStorage.getItem("my-token")
        if(token){
            getCurrentUser()
        }

    },[])

    return(
        <AuthContex.Provider value={{state,Login,Logout}}>
            {children}
        </AuthContex.Provider>
    )
}

export default ParentContext