import { Box, IconButton, InputAdornment, Stack, TextField, Toolbar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import './Conversation.css'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useTheme } from '@emotion/react';
import Messages from '../Messages/Messages';
import { blue, lightBlue } from '@mui/material/colors'


export default function Conversation() {
    const [chatHistory, setChatHistory] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatWindowRef = useRef(null);
    const textFieldRef = useRef(null);

    const emptyMsg = {
        type: "empty",
    }

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMsg = {
                type: "msg",
                message: newMessage,
                incoming: false,
                outgoing: true
            };
            setNewMessage("");
            setChatHistory([...chatHistory, newMsg]);
            textFieldRef.current.focus();
        }
    }
    const theme = useTheme();
    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    }


    useEffect(() => {
        setChatHistory([...chatHistory, emptyMsg]);
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory])

    return (
        <Stack sx={{ height: '100vh', flexGrow: 1, backgroundColor: lightBlue[50] }}>
            <Toolbar />
            <Box
                id='chat-window'
                ref={chatWindowRef}
                sx={{ overflowY: 'scroll', height: '100vh' }}>
                <Messages chatHistory={chatHistory} />
            </Box>
            <Box
                p={2}
                sx={{
                    width: '100%',
                    backgroundColor: "#F8FAFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                }}>
                <Stack direction="row" alignItems={"center"} spacing={3}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Ask me something..."
                        variant="outlined"
                        InputProps={{
                            endAdornment:
                                <InputAdornment>
                                    <IconButton>
                                        <DocumentScannerIcon />
                                    </IconButton>
                                </InputAdornment>
                        }}
                        value={newMessage}
                        onChange={e => { setNewMessage(e.target.value) }}
                        onKeyPress={handleEnterPress}
                        ref={textFieldRef}
                    />
                    <Box sx={{ height: 48, width: 48, borderRadius: 2.0, backgroundColor: theme.palette.primary.main }}>
                        <Stack sx={{ height: '100%', width: '100%' }} alignItems={'center'} justifyContent={'center'}>
                            <IconButton onClick={handleSendMessage} >
                                <SendIcon sx={{ color: blue[50] }} />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}
