import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom';
export default function Sidebar() {
    const [cats,setCats] = useState([]);

    useEffect(()=> {
        const getCats = async ()=> {
            const res = await axios.get("/api/categories");
            setCats(res.data);
        };
        getCats();
    },[]);
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT US</span>
            <img  src="https://i0.wp.com/jeremy.hu/wp-content/uploads/shows-jeremy-2021.png?fit=1200%2C791&quality=80&ssl=1" alt="" />
            <p>
                Series blog is dedicated for writing reviews and updating latest information on TV & Web Series
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c)=> (
                    <Link to={`/?cat=${c.name}`} className="link">
                        <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))}
                
                
            </ul>

        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
            <a href='https://www.instagram.com/aj.r.b/'><i className="sidebarIcon fa-brands fa-square-instagram"></i></a>
            <i className="sidebarIcon fa-brands fa-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            
            </div>
        </div>
    </div>
  )
}
