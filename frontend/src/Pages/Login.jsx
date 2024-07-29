import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../css/LoginPage.css'

const LoginPage=()=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit=async()=>{
        console.log({'username':username,'password':password})
        const response=await axios({method:'post',url:' http://127.0.0.1:5000/UserLogin',data:{'username':username,'password':password}})
        if(response.status===200){
            console.log(response.status)
            navigate("/Predict")
        }
        }
    return(
    <div>
        <div className='user_input'>
            <label>
                Username
            <input id="username" type="text" required={true} onChange={(e)=>{setUsername(e.target.value)}}></input>
            </label>
                Password
            <label>
            <input id="password" type="text" required={true} onChange={(e)=>{setPassword(e.target.value)}}></input>
            </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
    );
}

export default LoginPage