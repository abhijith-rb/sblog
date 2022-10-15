import React from 'react';
import { useState } from 'react';
import './deleteAcc.css'
import DeleteConfirmation from '../../components/delete/DeleteConfirmation';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function DeleteAcc() {
  const {user, dispatch} = useContext(Context)
  const [success,setSuccess] = useState(false);
  const [username, setUsername] = useState("")
  const[password,setPassword] = useState("")
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const[deleteMessage,setDeleteMessage] = useState("");
  const showDeleteModal = ()=>{
    setDeleteMessage('Are you sure?')
    setDisplayConfirmationModal(true)
  }
  const hideConfirmationModal = ()=>{
    setDisplayConfirmationModal(false)
  }
  const handleDelete = async ()=>{
    const delUser = {
     data:{userId : user._id, username: username ,password:password} 
    }
    try {
      await axios.delete("/api/users/"+ user._id , delUser );
      dispatch({type:"DELETE_SUCCESS"});
      setSuccess(true);
    } catch (err) {
      dispatch({type:"DELETE_FAILURE"});
      
    }
    
  }
  const submitDelete =()=>{
    handleDelete();
    hideConfirmationModal();

  }
  return (
    <div className='formWrap'>
      <h1 className='headline'>Delete your Account</h1>
        <form>
          <label className='label'>Enter Username</label>
          <br/>
          <input type="text" className='input' autoFocus onChange={(e)=> setUsername(e.target.value)}/>
          <br/>
          <label className='label'>Enter Password</label>
          <br/>
          <input type="password" className='input' onChange={(e)=> setPassword(e.target.value)}/>
          <br/>
          <button type="button" class="btn btn-danger" onClick={showDeleteModal}>Delete Account</button>
        </form>
        <div className='delt'>
         <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} message={deleteMessage}/>
       
        </div>
    </div>
  )
}
