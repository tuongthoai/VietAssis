import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import io from "socket.io-client";
import './MainScreenStyle.css'
import { Stack } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import Conversation from "../Conversation/Conversation";
import { blue } from '@mui/material/colors'


const ENDPOINT = "http://localhost:3001"; // Địa chỉ máy chủ backend



export default function MainScreen() {
    const [messages, setMessages] = useState("");
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const triggerData = (msg) => {
        console.log(msg);
        setMessages(msg.answer);
    };

    // useEffect(() => {
    //     const socket = io(ENDPOINT);
    //     socket.on("objectEmit", triggerData);

    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/api/chat/create",
                { prompt }
            );
            setResponse(response.data); // Cập nhật phản hồi từ backend
        } catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };

    return (
        // {/* <div className="container">
        //     <h1>Messages</h1>
        //     <h1>Send Prompt to Backend</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label>
        //             Prompt:
        //             <input
        //                 type="text"
        //                 value={prompt}
        //                 onChange={(e) => setPrompt(e.target.value)}
        //             />
        //         </label>
        //         <button type="submit">Send</button>
        //     </form>
        //     <ReactMarkdown>{messages}</ReactMarkdown>
        // </div> */}

        // <Stack>
        //     <SideBar />
        //     {/* <Conversation /> */}
        // </Stack>

        <SideBar />
    )
}
