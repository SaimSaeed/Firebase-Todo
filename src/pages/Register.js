import React, { useState } from 'react'
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth"
import { auth } from '../config/firebase_config';
import {Link,useNavigate} from "react-router-dom"

function Register() {
const navigate = useNavigate()
  const [ values,setValues]= useState({
    name:"",
    email:"",
    pass:""
  })

  const [errorMsg,setErrorMsg] = useState("");
  const [submitButtonDisable,setSubmitButtonDisable] = useState(false);



  const handleSubmission =  (e)=>{
    e.preventDefault()
    if(!values.name || !values.email || !values.pass){
      setErrorMsg("Fill All Fields!")
      return;
    }
    else if(values.pass.length<10){

      setErrorMsg("Password Should be at least 10 Characters!")
      return;
    }
    setErrorMsg("")
    console.log(values)
    setSubmitButtonDisable(true)
    createUserWithEmailAndPassword(auth,values.email,values.pass).then( async (res)=>
      {
     setSubmitButtonDisable(false)
      const user= res.user;
   await   updateProfile(user,{
        displayName:values.name
      })
      navigate("/login")

    }).catch((error)=>{
       setSubmitButtonDisable(false) 
       setErrorMsg(error.message)
       console.log(error)})
   

    
   
  }
  return (
    <div className='register-box'>

      <div className='registerform'>
        <h2>Register</h2>
        <h4 style={{color:"red"}}>{errorMsg}</h4>
        <div className='input-box'> 
        <input type="text"  placeholder='Name' onChange={event => setValues(prev=>({...prev,name:event.target.value}))}/>
        <input type="text" placeholder='Email' onChange={event => setValues(prev=>({...prev,email:event.target.value}))}/>
        <input type="text" placeholder='Password' onChange={event => setValues(prev=>({...prev,pass:event.target.value}))}/>
      
         <Link to={"/login"} className='link'>Click Here to Login</Link>
        <button className='button' onClick={handleSubmission} disabled={submitButtonDisable} > Register</button>
        
        </div>
      </div>





    </div>
  )
}

export default Register