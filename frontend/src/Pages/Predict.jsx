import React, { useState } from 'react'
import axios from 'axios'
import '../css/LoginPage.css'

const PredictPage=()=>{
    const [drugA,setDrugA]=useState("")
    const [drugB,setDrugB]=useState("")
    const handleSubmit=async()=>{
        console.log({'drugA':drugA,'drugB':drugB})
        const response=await axios({method:'post',url:' http://127.0.0.1:5000/Predict',data:{'drugA':drugA,'drugB':drugB}})
        if(response.status===200){
            console.log(response.data)
        }
    }
    return(
    <div>
        <div className='user_input'>
            <label>
                Enter DrugA
            <input id="username" type="text" required={true} onChange={(e)=>{setDrugA(e.target.value)}}></input>
            </label>
                Enter DrugB
            <label>
            <input id="password" type="text" required={true} onChange={(e)=>{setDrugB(e.target.value)}}></input>
            </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
    );
}

export default PredictPage