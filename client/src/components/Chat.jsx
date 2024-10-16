import React from 'react'
import './Chat.css'
import { useLocation } from 'react-router-dom'

const Chat = () => {

    const location = useLocation();
    const chat = location.state.chat.chat;
    console.log(chat);

  return (
    <div className='container'>
            {!chat.empty&&chat.map((ele, index) => (
                <div key={index} className={index % 2 === 0 ? "even-div1" : "odd-div1"}>
                    {ele}
                </div>
            ))}
    </div>
  )
}

export default Chat
