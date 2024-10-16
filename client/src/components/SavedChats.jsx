import React, { useEffect, useState } from 'react'
import './SavedChats.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SavedChats = () => {

    const [chats, setChats] = useState([]);
    const location = useLocation();
    const user_admin = location.state;
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    let user = currentUser;
    if (user_admin) user = user_admin.user;

    useEffect(() => {
        console.log(user);
        setChats(user.chats);
    }, [])

    const handleClick = (chat) => {
        navigate('/fullchat', { state: { chat } });
    }

    return (
        <div className='container2'>
            {chats.length === 0 && <div style={{margin: "20px", fontWeight: "bold", fontSize:"20px", textAlign: "center"}}>No chat is saved yet</div>}
            {chats?.map((chat) => (
                <div className='chats'>
                    <div style={{ alignItems: "flex-start", width: "70%", justifyContent: "center" }}>{chat.chat[0].slice(0, 40)}</div>
                    <button className='fullChat' onClick={() => handleClick(chat)}>chat...</button>
                </div>

            ))}
        </div>
    )
}

export default SavedChats
