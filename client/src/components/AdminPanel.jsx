import React, { useEffect, useState } from 'react'
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_URL = process.env.REACT_APP_API_URL;

const AdminPanel = () => {

  const {currentUser} = useSelector(state=>state.user);

    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${currentUser.accesstoken}`
        },
    });

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

  useEffect(()=>{
    const fetchUsers = async ()=>{
      try{

        const res = await userRequest.get('/users/');

        const allUsers = res.data;
        console.log(allUsers);
        setUsers(allUsers);

      }catch(err){
        console.log(err);
      }
    }
    fetchUsers();
  },[]);

  const handleClick = (user)=>{
    navigate('/savedChats', {state: {user}});
  }

  return (
    <>
    <h3 style={{textAlign:"center",fontWeight: 20, marginTop:"40px", marginBottom:"-40px"}}>Chatbot Users</h3>
    <div className='container'>
    {users.map((user)=>(
        <div key={user.username} className='users'>
            <div style={{alignItems: "flex-start", width: "70%"}}>{user.username}</div>
            <button className='savedChats' onClick={()=>handleClick(user)}>Saved Chats</button>
        </div>
        
    ))}
    </div>
    </>
  )
}

export default AdminPanel
