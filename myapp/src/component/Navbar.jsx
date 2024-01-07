import React, { useContext } from 'react'
import { AuthContex } from './AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const router = useNavigate()
    const{state,Logout} = useContext(AuthContex)

    return (
        <div style={{display:"flex",justifyContent:"space-between",height:"30px",border:"1px solid black",paddingTop:"15px",paddingBottom:"5px",marginBottom:"50px",backgroundColor:"blueviolet"}}>
            <div style={{marginLeft:"50px",fontSize:"20px",fontWeight:"800"}}>HOME</div>

            <div style={{width:"500px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <input type="text" style={{width:"200px",height:"23px"}} />
                    <input type="text" />
                </div>
            </div>
            <div style={{marginRight:"50px",width:"300px",cursor:"pointer"}}>
                {state?.user?.id ?
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div onClick={()=>router('/add-product')}>ADD PRODUCT</div>
                        <div>USER:<b>{state?.user?.name}</b></div>
                        <div onClick={Logout}>LOGOUT</div>
                    </div>
                    :
                    <div onClick={()=>router('/login')}>LOGIN</div>
                }

            </div>
        </div>
    )
}

export default Navbar