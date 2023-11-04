import React from 'react'
import './signUp.css'
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'

const SignUp = () => {
    const navigate = useNavigate();
    const [values, setValues]= useState({
        name:"",
        email:"",
        pass:""
    });
    const[errMsg, setErrMsg]= useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled]= useState(false);
    const handleSubmit=()=>{
        if(!values.name || !values.pass|| !values.email){
            setErrMsg("*Please don't hide anything asked");
            return;
        }
        setErrMsg("");
        setSubmitButtonDisabled(true);
        
        createUserWithEmailAndPassword(auth, values.email, values.pass).then(async(res)=>{
            const user = res.user;
            await updateProfile(user,{displayName:values.name,});
            setSubmitButtonDisabled(false);
            navigate('/');
        }).catch((err)=>{
            setErrMsg(err.message);
        })
        console.log(values);
    };
  return (
    <>
    <div className='box'>
        <h1 className='heading'>Sign-Up</h1>
        <div className="inputform">
            <p>Name</p>
            <input type="text" onChange={(event)=>setValues((prev)=>({...prev, name: event.target.value}))} placeholder='How you like to called ?' />
            <p>E-mail</p>
            <input type="email" onChange={(event)=>setValues((prev)=>({...prev, email: event.target.value}))} placeholder='Tell us your email Id' />
            <p>Password</p>
            <input type="password" onChange={(event)=>setValues((prev)=>({...prev, pass: event.target.value}))} placeholder='Set up a password' />
        </div>
        <div className="errmsg"><p>{errMsg}</p></div>
        <div className="bn">
            <button className='btn' disabled={submitButtonDisabled} onClick={handleSubmit}>Sign Up</button>
        </div>
        <p>Already have an account <Link to='/' className='link'>Login</Link></p>
    </div>
    </>
  )
}

export default SignUp