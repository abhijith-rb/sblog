import React from "react"
import "./write.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import {Context} from "../../context/Context"

export default function Write() {
    const [title,setTitle] = useState("");
    const [category1,setCategory1] = useState("");
    const [category2,setCategory2] = useState("");
    
    const [desc,setDesc] = useState("");
    const [file,setFile] = useState(null);
    const {user} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newPost = {
            username:user.username,
            title,
            desc,
            userId:user._id,
            categories:[category1,category2],
        };

        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo = filename;
            try {
               await axios.post("/api/upload",data) ;
            } catch (err) {
                
            }
        }
        try {
           const res = await axios.post("/api/posts",newPost);
           window.location.replace("/post/" + res.data._id);
        } catch (err) {
            
        }
       
    }

  return (
    <div className="write">
        {file && (
                <img 
                className="writeImg"
                 src= {URL.createObjectURL(file)}
                 alt="" />
        )

        }
        
        <form action="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} 
                onChange={(e)=> setFile(e.target.files[0])}
                />
                <input type="text" placeholder="Title" className="writeInput" autoFocus={true}
                onChange={(e)=> setTitle(e.target.value)} />

                <input type="text" placeholder="Category" className="writeInput" autoFocus={true}
                onChange={(e)=> setCategory1(e.target.value)} />

                <input type="text" placeholder="Category" className="writeInput" autoFocus={true}
                onChange={(e)=> setCategory2(e.target.value)} />
                
            </div>
            <div className="writeFormGroup">
                <textarea type="text" placeholder="Tell your story..." className="writeInput writeText"
                onChange={(e)=> setDesc(e.target.value)}>
                </textarea>
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}