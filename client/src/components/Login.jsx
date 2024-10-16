import React, { useEffect } from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {error, currentUser} = useSelector(state=>state.user);
    const navigate = useNavigate();

    const handleClick = async (e)=>{
        e.preventDefault();
        await login(dispatch, {username, password});
    }
    
    const handleClick1 = (e)=>{
        e.preventDefault();
        navigate('/register');
    }

    useEffect(()=>{
        if(currentUser){
            navigate('/chat');
        }
    },[currentUser]);

    return (
        <div
            style={{
                flex: 4,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {error&&<div> Login failed</div>}
            <input
                style={{ padding: 10, marginBottom: 20, width: "500px" }}
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{ padding: 10, marginBottom: 20, width: "500px" }}
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} style={{ padding: 10, width: 100, marginBottom: 5 }}>
                Login
            </button>
            <button onClick={handleClick1} style={{ padding: 10, width: 150 }}>
                Don't have account then Register
            </button>
        </div>
    )
}

export default Login
