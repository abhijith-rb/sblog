import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const {user , dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  };

  return (
    <div className="top">
       <div className="topLeft">
        {user && <Link className='link' to={`/?uId=${user._id}`}>
        <span className='userName'>{user.username}</span></Link>}
        {
          user ? (<Link to="/settings"> <img
            className="topImg"
             src= {PF+user.profilePic} 
             alt="" /></Link>) 
             :(<ul className="topList">
                <li className="toplistItems">
                  <Link className="link" to="/login">Login</Link>
                </li>
                <li className="toplistItems">  
                  <Link className="link" to="/register">Register</Link>
                </li>
              </ul>)
          }
        <Link className="link" to="/search">
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </Link>
        
      </div>
      
      <div className="topCenter">
        <ul className="topList">
          <li className="toplistItems">
            <Link className="link" to="/">Home</Link>
            </li>
          <li className="toplistItems"><Link className="link" to="/about">About</Link></li>
          <li className="toplistItems"><Link className="link" to="/contact">Contact</Link></li>
          <li className="toplistItems"><Link className="link" to="/write">Write</Link></li>
          <li className="toplistItems" onClick={handleLogout}>{user && "Logout"}</li>
        </ul>
      </div> 

      <div className="topRight">
      <a href='https://www.instagram.com/aj.r.b/'><i className="topIcon fa-brands fa-square-instagram"></i></a>
      <a href=''><i className="topIcon fa-brands fa-facebook"></i></a>
      <a href=''><i className="topIcon fa-brands fa-square-twitter"></i></a>
      </div>
     
     </div>
  )
}
