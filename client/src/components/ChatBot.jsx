import React, { useRef, useState, useEffect } from 'react'
import './ChatBot.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { update } from '../redux/userRedux';

const BASE_URL = process.env.REACT_APP_API_URL;
const arr = [];
const summary = [];

const ChatBot = () => {

    const textRef = useRef(null);

    const [query, setQuery] = useState("");
    const [session, setSession] = useState("");
    const [flag, setFlag] = useState(false);
    const [flag1, setFlag1] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${currentUser.accesstoken}`
        },
    });

    const handleClick = () => {
        arr.push(query);
        const submitRes = async () => {
            try {
                const res = await userRequest.post('/chats/chat', {
                    message: query,
                    sessionId: session
                })

                const ans = res.data;
                if (ans.error) {
                    arr.push(ans.error);
                    return;
                }
                const ai = ans.response.result_text;
                summary.push(ans.response.summary);
                arr.push(ai);
                const id = ans.sessionId;
                setSession(id);
                setQuery("");

            } catch (err) {
                console.log(err);
            }
        }
        submitRes();

    }

    const handleSave = () => {

        const SaveChat = async () => {
            try {

                const res = await userRequest.post('/chats/saveChat', {
                    sessionId: session
                });

                const savedUser = res.data;
                if (savedUser.err) {
                    setFlag1(true);
                    setTimeout(() => {
                        setFlag1(false);
                    }, 1000);
                    return;
                }
                savedUser.accesstoken = currentUser.accesstoken;
                dispatch(update(savedUser));
                console.log(savedUser);

            } catch (err) {
                console.log(err);
            }
        }
        SaveChat();

        setFlag(true);
        setTimeout(() => {
            setFlag(false);
        }, 1000);

    }

    const handleUsers = (e) => {
        e.preventDefault();
        navigate('/admin');
    }

    const handleHistory = (e) => {
        e.preventDefault();
        navigate('/savedChats');
    }

    const handleInput = () => {
        const text = textRef.current;
        if (text) {
            text.style.height = "auto";
            text.style.height = `${text.scrollHeight}px`;
        }
    }


    return (
        <>
            <div className='nav'>
                {currentUser.isAdmin && <div style={{ marginLeft: "700px", marginRight: "20px", cursor: "pointer" }} onClick={handleUsers}>Users</div>}
                <div style={{ cursor: "pointer" }} onClick={handleHistory}>History</div>
            </div>
            {arr.length === 0 && <div className='start'>How can I help you today</div>}
            {!(arr.length === 0) && <div className='container1'>
                <div style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold", cursor: "pointer" }} onClick={handleSave}>Save chat</div>
                {flag && <div style={{ color: "green", textAlign: "center" }}>Successfully Saved</div>}
                {flag1 && <div style={{ color: "red", textAlign: "center" }}>Not Saved</div>}
                {arr.map((ele, index) => (
                    <>
                        <div key={index} className={index % 2 === 0 ? "even-div" : "odd-div"}>
                            {ele}
                        </div>
                        {index % 2 != 0 && <div className='odd-div'>SUMMARY: {summary[(index - 1) / 2]}</div>}
                    </>
                ))}
            </div>}

            <div className='query'>
                <textarea ref={textRef} rows="1" onInput={handleInput} className='enter' type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className='submit' onClick={handleClick}>Send</button>
            </div>
        </>
    )
}

export default ChatBot
