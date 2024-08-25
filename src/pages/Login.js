import React, {useState} from 'react'
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from '../config/firebase_config';
import {Link,useNavigate} from "react-router-dom"


function Login() {
  const navigate = useNavigate()
  const [ values,setValues]= useState({
    email:"",
    pass:""
  })

  const [errorMsg,setErrorMsg] = useState("");
  const [submitButtonDisable,setSubmitButtonDisable] = useState(false);



  const handleSubmission =  (e)=>{
    e.preventDefault()
    if(!values.email || !values.pass){
      setErrorMsg("Fill All Fields!")
      return;
    }
    else if(values.pass.length<10){
      setErrorMsg("Password Should be at least 10 Characters!")
      return;
    }
    setErrorMsg("")
    setSubmitButtonDisable(true)
    signInWithEmailAndPassword(auth,values.email,values.pass).then((res)=>{
      setSubmitButtonDisable(false)
      navigate("/")
    }).catch((error)=>{
       setSubmitButtonDisable(false) 
       setErrorMsg(error.message)
       console.log(error)})
   

    
   
  }
  return (
    <div className='register-box'>

      <div className='registerform' style={{height:"60vh"}}>
        <h2>Login</h2>
        <h4 style={{color:"red"}}>{errorMsg}</h4>
        <div className='input-box'> 
        <input type="text" placeholder='Email' onChange={event => setValues(prev=>({...prev,email:event.target.value}))}/>
        <input type="text" placeholder='Password' onChange={event => setValues(prev=>({...prev,pass:event.target.value}))}/>
      
         <Link to={"/register"} className='link'>Click Here to Register</Link>

        <button className='button' onClick={handleSubmission} disabled={submitButtonDisable} > Login</button>
        <Link to={"/login"} className='link'>Forgot Password?</Link>
        
        
        
        </div>
      </div>





    </div>
  )
}

export default Login