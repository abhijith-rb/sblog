import React from 'react'
import "./contact.css"

export default function Contact() {
  return (
    <div className='contactm'>
        <h2 className='contacth'>Contact Us</h2>
        <div className='contactd'>
            <span>Email:abc@gmail.com</span>
            <br/>
            <span>Phone: 987654321</span>
        </div>

        <div className='social'>
        <a href='https://www.instagram.com/aj.r.b/'><i className="topIcon fa-brands fa-square-instagram"></i></a>
      
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        

        </div>
        
        
    </div>
  )
}
