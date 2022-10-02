import React from 'react'
import ReactDOM from 'react-dom'
import { useContext , useState} from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.css"
import axios from "axios";

export default function Settings() {
    const {user , dispatch} = useContext(Context)
    const [file,setFile] = useState(null);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState(false);

    const PF = "http://localhost:5000/images/"


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId:user._id,
            username, 
            email,  
            password,
            
           };

        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic = filename;
            try {
               await axios.post("/api/upload",data) ;
               
            } catch (err) {
                
            }
        }
        try {
          const res = await axios.put("/api/users/" + user._id ,updatedUser);
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
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file) : PF +user.profilePic} alt="" />
                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}}
                    onChange={(e)=> setFile(e.target.files[0])} />


                </div>
                <label>Username : {user.username ? user.username :'*add username*' }</label>
                <input type="text" placeholder="change username..." onChange={e=>setUsername(e.target.value)} />  {/*placeholder={user.username} */}
                <label>Email : {user.email ? user.email : '*add email*'}</label>
                <input type="email" placeholder="change email..." onChange={e=>setEmail(e.target.value)}/>        {/* placeholder={user.email}*/}
                <label>Password :{user.password ? "exists" : "Set Password"}</label>
                <input type="password" onChange={e=>setPassword(e.target.value)} />
                <button className="settingsSubmit" type="submit">Update</button>
                {success && <span style={{color:"green", textAlign:"center", margin:"20px"}}>Profile has been updated</span>}
            </form>
        </div>
        <Sidebar/>
        


    </div>
  )
}
