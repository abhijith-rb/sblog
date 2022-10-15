import React from 'react'
import { useContext , useState} from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.css"
import axios from "axios";
import { Link } from 'react-router-dom'

export default function Settings() {
    const {user , dispatch} = useContext(Context)
    const [file,setFile] = useState(null);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState(false);

    const PF = "http://localhost:5000/images/"


    const updatePic = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUserPic = {
            userId:user._id,
            
           };

        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUserPic.profilePic = filename;
            try {
               await axios.post("/api/upload",data) ;
               
            } catch (err) {
                
            }
        }
        try {
            const res = await axios.put("/api/users/" + user._id ,updatedUserPic);
            dispatch({type:"UPDATE_SUCCESS" , payload:res.data});
            setSuccess(true);
          } catch (err) {
              dispatch({type:"UPDATE_FAILURE"});
          }
         
       
    }
    const updateUsername = async (e)=> {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId:user._id,
            username, 
            
           };
        const posts = await axios.get(`/api/posts/?uId=${user._id}`)

        try {
          const res = await axios.put("/api/users/" + user._id ,updatedUser);
          dispatch({type:"UPDATE_SUCCESS" , payload:res.data});
          setSuccess(true);
        } catch (err) {
            dispatch({type:"UPDATE_FAILURE"});
        }
        //console.log(posts.data)
        
        await posts.data.map((post)=>(
            axios.put(`/api/posts/${post._id}`,{userId:user._id , username})
           ))
    }
    const updateEmail = async (e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedEmail ={
            userId:user._id,
            email,
        };
        try {
            const res = await axios.put("/api/users/"+ user._id, updatedEmail);
            dispatch({type:"UPDATE_SUCCESS" , payload:res.data});
            setSuccess(true);
        } catch (err) {
            dispatch({type:"UPDATE_FAILURE"});
        }
    }
    const updatePwd = async (e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedPwd ={
            userId:user._id,
            password,
        };
        try {
            const res = await axios.put("/api/users/"+ user._id, updatedPwd);
            dispatch({type:"UPDATE_SUCCESS" , payload:res.data});
            setSuccess(true);
        } catch (err) {
            dispatch({type:"UPDATE_FAILURE"});
        }
    }
  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <Link className="link" to="/deleteAcc">
                <span className='settingsDeleteTitle'>Delete Account </span></Link>
            </div>
            <form className="settingsForm" >
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file) : PF +user.profilePic} 
                    alt=""/>

                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}}
                    onChange={(e)=> setFile(e.target.files[0])} />
                </div>
                <button className='update' onClick={updatePic}>Update ProfilePic</button>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} />  {/*{user.username ? user.username :'*add username*' } */}
                <button className='update' onClick={updateUsername}>Update Username</button>
                <label>Email </label>
                <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>        {/* : {user.email ? user.email : '*add email*'} */}
                <button className='update' onClick={updateEmail}>Update Email</button>
                <label>Password</label>
                <input type="password" onChange={e=>setPassword(e.target.value)} />
                <button className='update' onClick={updatePwd}>Update Password</button>
                {success && <span style={{color:"green", textAlign:"center", margin:"20px"}}>Profile has been updated</span>}
            </form>
        </div>
        <Sidebar/>
        
    </div>
  )
}
