import "./login.css"
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from "react-router-dom"
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios"

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post("/api/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type: "LOGIN_SUCCESS", payload:res.data});
      
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE"});
    }
  };
  //console.log(user)

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text"
             className="loginInput" 
             placeholder="enter your username"
             ref={userRef}/>
            <label>Password</label>
            <input type="password" 
            className="loginInput" 
            placeholder="enter your password"
            ref={passwordRef}/>
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
        <button className="loginRegisterButton"><Link to="/register" className="link">Register</Link></button>
    </div>
  )
}
