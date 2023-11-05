import { useEffect, useState } from "react";
// import "./App.css";
import Home from "./home/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./login/Login";
import SignUp from "./signUp/SignUp";
import { auth } from "./firebase";


function App() {
  const [userName, setUserName]= useState("");
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      console.log(user);
      if(user){
        setUserName(user.displayName)
      }else setUserName("");
    })
  },[])

  return (
    <>
    <Router>
      <Routes>
        <Route path ='/home' element={<Home name={userName}/>}/>
        <Route path ='/' element={<Login/>}/>
        <Route path ='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
