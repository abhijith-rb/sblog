import React from 'react'
import ReactDOM from 'react-dom'
import './header.css'

export default function Header() {
  return (
    <div className='header'>
        <div className='headerTitles'>
            <span className='headerTitleSm'>Series</span>
            <span className='headerTitlelg'>Blog</span>
        </div>
        <img className='headerImg' src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80 " alt="" />
    </div>
  )
}