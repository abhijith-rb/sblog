import React from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import "./singlePost.css"
import axios from "axios"
import { useState } from "react";
import {Link} from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../context/Context";
import DeleteConfirmation from '../delete/DeleteConfirmation';



export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post,setPost] = useState([])    // {} replaced by [] due to error
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context)
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [updateMode,setUpdateMode] = useState(false)
    const [cat1,setCat1] = useState("")
    const [cat2,setCat2] = useState("")
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [file,setFile] = useState(null);
  //const [fmessage, setMessage] = useState(null);
  const showDeleteModal = () => {
    //setMessage(null);
    setDeleteMessage(`Are you sure you want to delete ${post.title} ?`)
    setDisplayConfirmationModal(true);
  }
  const hideConfirmationModal = () => {
      setDisplayConfirmationModal(false);
      };
  const submitDelete = () => {
      //setMessage('Post deleted successfully')
      handleDelete()
      setDisplayConfirmationModal(false)
    }
    
    useEffect(()=> {
        const getPost = async ()=> {
            const res = await axios.get("/api/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setCat1(res.data.categories[0])
            setCat2(res.data.categories[1])
        }
        getPost()
    },[path]);
    const handleDelete = async ()=> {
        try {
            await axios.delete("/api/posts/" + path, {data:{username: user.username, userId: user._id}});
            window.location.replace("/");
        } catch (err) {
            
        }
    }
    const handleUpdate = async ()=> {
      const updPost= {username: user.username,
        title ,desc, userId: user._id, categories:[cat1,cat2]}

        if(file){
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name",filename);
          data.append("file",file);
          updPost.photo = filename;
          try {
            await axios.post("/api/upload",data) ;
         } catch (err) {
             
         }
        }
        try {
            await axios.put("/api/posts/" + path, updPost);
            window.location.reload();
            //setUpdateMode(false);
      
            
        } catch (err) {
            
        }
    }
    
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
        
            {post.photo && (<img 
            className="singlePostImg"
            src={PF + post.photo} 
            alt="" />)}
            <div className='updateImg'>
            <div className="updIconDiv">
            {updateMode && <label htmlFor="fileInput">
                  <i className="updIcon fas fa-plus"></i>Add/Update Pic</label>}
            {updateMode && <input type="file" id="fileInput" style={{display:"none"}} 
                  onChange={(e)=> setFile(e.target.files[0])}
                  />
                }
            </div>
            <div className="updImgDiv">
            {file && (
                <img 
                className="updImg"
                 src= {URL.createObjectURL(file)}
                 alt="" />
              )}
            </div>
            </div>
            {updateMode ? <input type="text" value={title}
             className="singlePostTitleInput" autoFocus
             onChange={(e)=> setTitle(e.target.value)}/> : (
                <h1 className="singlePostTitle">
                {title}
                {post.userId === user?._id  && 
                <div className="singlePostEdit">
                <i className="singlePostIcon fa-solid fa-pen-to-square" 
                onClick={()=> setUpdateMode(true)}></i>
                <i className="singlePostIcon fa-solid fa-trash" onClick={showDeleteModal}></i>
                </div>}
                </h1>
            )} 
            
            <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                     Author:{' '}
                    <Link to={`/?uId=${post.userId}`} className="link">
                    <b>{post.username}</b>
                    </Link>
                    </span>
                    <div className='categories'>
                    <div className='catHead'>
                    {!updateMode && <span>Categories:</span>}
                    </div>
                    <div className='cate1'>
                    {updateMode ? <input type="text" value={cat1}
                      className="cate1" autoFocus
                      onChange={(e)=> setCat1(e.target.value)}/> : (
                        <Link to={`/?cat=${cat1}`} className='link' >
                        <b>{cat1+","}</b> 
                        </Link>
                      )
                    }
                    </div>
                    <div className='cate2'>
                    {updateMode ? <input type="text" value={cat2}
                      className="cate2" autoFocus
                      onChange={(e)=> setCat2(e.target.value)}/> : (
                       <Link to={`/?cat=${cat2}`} className='link' >
                       <b>{cat2}</b> 
                       </Link>
                      )
                    }
                    </div>
                    </div>

            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
                <textarea className="singlePostDescInput" value={desc} 
                onChange={(e)=> setDesc(e.target.value)}/>
            ) : (
                <p className="singlePostDesc">
                {desc}
                </p>
            )}
            {updateMode &&
             ( <button className="singlePostButton" onClick={handleUpdate}>Update</button>)}
           
        </div>
       
        <div className='delt'>
        
       <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} message={deleteMessage}/>
        </div>
    </div>
    
  )
  
}
