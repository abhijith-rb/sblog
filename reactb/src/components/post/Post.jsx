import React from 'react'
import ReactDOM from 'react-dom'
import "./post.css"
import {Link} from "react-router-dom"

export default function Post({post}) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
       <Link to = {`/post/${post._id}`} className="link">
      {post.photo && (
      <img
        className="postImg"
         src={PF + post.photo}
         alt="" />)}
        
        <div className="postInfo">

           <span className="postTitle">{post.title}</span>

            <div className="postCats">
             {post.categories.map((c)=> (
                <span className="postCat">{c}</span>  
                
             ))}
            
            </div>
            
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>

        </div>
        <p className="postDesc">
          {post.desc}
        </p>
        </Link>
    </div>
  )}