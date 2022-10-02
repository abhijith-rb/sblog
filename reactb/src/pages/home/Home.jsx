import './home.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();

  //console.log(location)

  useEffect(()=>{ 
    const fetchPosts = async ()=>{
      const res = await axios.get("/api/posts" + search)
      setPosts(res.data)
  }
  fetchPosts()
   },[search])
  return (
    <> 
    <Header/>
    <div className='home'>
        <Posts posts={posts}/>
        <Sidebar/>
    </div>
    </>
   
  )
}