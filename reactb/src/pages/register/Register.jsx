import "./register.css"
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function Register() {
  const [username,setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
    
    

  }
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form action="" className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="registerInput" placeholder="enter username"
            onChange={e=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" className="registerInput" placeholder="enter your email"
             onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" className="registerInput" placeholder="enter your password"
             onChange={e=>setPassword(e.target.value)}/>
            <button className="registerButton" type="submit">Register</button>
        </form>
        <button className="registerLoginButton">
          <Link to="/login">Login</Link>
        </button>
       {error && <span style={{color:'red',marginTop:"10px"}}>Something went wrong !</span>} 
    </div>
  )
}