import React from 'react'
import './login.css'
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'


const Login = () => {
    const navigate = useNavigate();
    const [values, setValues]= useState({
        email:"",
        pass:""
    });
    const[errMsg, setErrMsg]= useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled]= useState(false);
    const handleSubmit=()=>{
        if(!values.pass|| !values.email){
            setErrMsg("*Please don't hide anything asked");
            return;
        }
        setErrMsg("");
        setSubmitButtonDisabled(true);
        
        signInWithEmailAndPassword(auth, values.email, values.pass).then(async(res)=>{
            setSubmitButtonDisabled(false);
            navigate('/home');
        }).catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrMsg(err.message);
            
        })
    };
  return (
    <>
    <div className='box'>
        <h1 className='heading'>Login</h1>
        <div className="inputform">
            <p>E-mail</p>
            <input type="email" onChange={(event)=>setValues((prev)=>({...prev, email: event.target.value}))}  placeholder='Tell us your email Id' />
            <p>Password</p>
            <input type="password" onChange={(event)=>setValues((prev)=>({...prev, pass:event.target.value}))}  placeholder='Set up a password' />
        </div>
        <div className="errmsg"><p>{errMsg}</p></div>
        <div className="bn">
            <button className='btn' onClick={handleSubmit} disabled={submitButtonDisabled}>Login</button>
        </div>
        <p>Don't have an account <Link to='/signup' className='link'>Sign Up</Link></p>
    </div>
    </>
  )
}

export default Login