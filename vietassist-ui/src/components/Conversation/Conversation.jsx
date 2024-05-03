import {
    Box, IconButton, InputAdornment, Stack, TextField,
    Typography, Modal, Card, CardContent,
    CardActions, Button, Grid, Chip
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import './Conversation.css'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Messages from '../Messages/Messages';
import { blue, grey, red, amber, indigo } from '@mui/material/colors'
import data from '../../data/vietassist.json'
import axios from 'axios'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { addToChatHistory, replaceLastResponseMsg, updateChatHistory, updateCurrentPos } from '../../slices/chatHistorySlice';
import { addToChatDataHistory } from '../../slices/chatDataSlice';

const ENDPOINT = "http://localhost:3001"; // Địa chỉ máy chủ backend


export default function Conversation() {
    const [newMessage, setNewMessage] = useState('');

    const chatWindowRef = useRef(null);
    const textFieldRef = useRef(null);

    const [openPrompt, setOpenPrompt] = useState(false);
    const [prompt, setPrompt] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState(null);

    const [responseMessage, setResopnseMessage] = useState("");
    const [completeAnswer, setCompleteAnswer] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const temp = useSelector(state => state.chatHistory.value);
    const currentPos_tmp = useSelector(state => state.chatHistory.currentPos);
    const dispatch = useDispatch();

    const triggerData = (msg) => {
        const answer_temp = msg.answer;
        setResopnseMessage(answer_temp);
        if (msg.completeAnswer !== null && msg.completeAnswer !== "") {
            setCompleteAnswer(msg.completeAnswer);
        }
    };

    useEffect(() => {
        const resMessage = {
            type: "msg",
            message: completeAnswer,
            incoming: true,
            outgoing: false,
            isLoading: false,
        };

        if (completeAnswer !== '' && typeof completeAnswer !== 'undefined') {
            dispatch(replaceLastResponseMsg(resMessage));
            // update model response message
            const modelResponse = {
                "role": "model",
                "parts": [{ "text": completeAnswer }]
            }
            setIsLoading(false);
            dispatch(addToChatDataHistory(modelResponse));
        }

    }, [completeAnswer])


    useEffect(() => {
        setPrompt(data.prompt);
        const socket = io(ENDPOINT);
        socket.on('objectEmit', triggerData)
        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        scrollToBottom();
        // console.log("temp \n", temp);
    }, [temp])

    useEffect(() => {
        const resMessage = {
            type: "msg",
            message: responseMessage,
            incoming: true,
            outgoing: false,
            isLoading: true,
        };

        if (resMessage.message !== "") {
            if (typeof temp[currentPos_tmp] === 'undefined') {
                dispatch(addToChatHistory(resMessage));
            } else {
                const updatedHistory = [...temp];
                updatedHistory[currentPos_tmp] = resMessage;
                dispatch(updateChatHistory(updatedHistory));
            }
        }
    }, [responseMessage]);


    const promptStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '1300px',
        width: '1200px',
        bgcolor: grey[50],
        border: `2px solid ${blue[900]}`,
        boxShadow: 24,
        borderRadius: 1.5,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto',
        overflowX: 'hidden',
    };

    const minHeight = 64;

    const chatDataHistory = useSelector(state => state.chatData.history);

    const handleSendMessage = async () => {

        if (newMessage.trim() === "") {
            return;
        }

        dispatch(updateCurrentPos(temp.length + 1));

        setIsLoading(true);

        if (newMessage.trim() !== "") {
            const newMsg = {
                type: "msg",
                message: newMessage,
                incoming: false,
                outgoing: true
            };
            setNewMessage("");
            dispatch(addToChatHistory(newMsg));
            textFieldRef.current.focus();
        }

        // const body = {
        //     "prompt": newMessage
        // }

        // new body
        let prompt = "";
        if (currentPrompt !== null) {
            prompt = currentPrompt.content + " " + newMessage;
        } else {
            prompt = newMessage;
        }
        const body = {
            "history": chatDataHistory,
            "prompt": prompt,
        }
        console.log(body);
        try {
            const response = await axios.post("http://localhost:3001/api/chat/create", body);
        }
        catch (error) {
            console.log(error);
        }


        const userChat = {
            "role": "user",
            "parts": [{ "text": newMessage }]
        }
        dispatch(addToChatDataHistory(userChat));
    }
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

    const handleUsePrompt = (p) => {
        setCurrentPrompt(p);
        setOpenPrompt(false);
    }


    const renderPrompts = () => {
        const prompts = []

        prompt.map((p) => {
            prompts.push(
                <Grid key={p.id} item xs={3} zeroMinWidth>
                    <Card sx={{ maxWidth: 345, padding: '10px', border: `2px solid ${blue[700]}`, height: "300px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardContent>
                            <Typography sx={{ height: "50px" }} gutterBottom variant="h6" component="div">
                                {p.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                marginTop={'20px'}>
                                {p.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                                <Button onClick={() => handleUsePrompt(p)} variant='contained' color='warning'>Use</Button>
                                <IconButton onClick={() => handleFavoriteBtn(p.id)} aria-label="add to favorites">
                                    <FavoriteIcon sx={{ color: p.isFavorite ? red[700] : grey[500] }} />
                                </IconButton>
                            </Stack>
                        </CardActions>
                    </Card>
                </Grid>
            )
        })
        return prompts
    }

    const handleFavoriteBtn = (id) => {
        const updatedPrompts = prompt.map((p) => {
            if (p.id === id) {
                return {
                    ...p,
                    isFavorite: !p.isFavorite
                };
            }
            return p;
        })
        setPrompt(updatedPrompts);
    }

    const handleItemClick = async (message) => {
        dispatch(updateCurrentPos(temp.length + 1));
        setIsLoading(true);
        if (message.trim() !== "") {
            const newMsg = {
                type: "msg",
                message: message,
                incoming: false,
                outgoing: true
            };
            setNewMessage("");
            dispatch(addToChatHistory(newMsg));
            textFieldRef.current.focus();
        }

        let prompt = "";
        if (currentPrompt !== null) {
            prompt = currentPrompt.content + " " + message;
        } else {
            prompt = message;
        }
        const body = {
            "history": chatDataHistory,
            "prompt": prompt,
        }
        console.log(body);
        try {
            const response = await axios.post("http://localhost:3001/api/chat/create", body);
        }
        catch (error) {
            console.log(error);
        }
        const userChat = {
            "role": "user",
            "parts": [{ "text": message }]
        }
        dispatch(addToChatDataHistory(userChat));
    }


    return (
        <Stack sx={{ backgroundColor: indigo[100], width: '100%', height: `calc(100vh - ${minHeight}px)` }}>
            {/* <Toolbar /> */}
            <Box
                id='chat-window'
                ref={chatWindowRef}
                sx={{ overflowY: 'scroll', height: '100%', paddingInline: '40px' }}>
                <Messages
                    chatHistory={temp}
                    handleItemClick={handleItemClick} />
            </Box>
            <Box
                p={2}
                sx={{
                    width: '100%',
                    backgroundColor: "#F8FAFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    paddingInline: '150px'
                }}>
                {currentPrompt !== null && (
                    <Chip
                        sx={{ marginBottom: '15px', backgroundColor: amber[200] }}
                        label={currentPrompt.name}
                        onDelete={() => setCurrentPrompt(null)}
                    />
                )}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.75 }}>
                    <Stack direction="row" alignItems={"center"} spacing={3}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Ask me something..."
                            variant="outlined"
                            InputProps={{
                                endAdornment:
                                    <InputAdornment>
                                        <IconButton color='warning' onClick={() => setOpenPrompt(true)}>
                                            <DocumentScannerIcon />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            value={newMessage}
                            onChange={e => { setNewMessage(e.target.value) }}
                            onKeyPress={handleEnterPress}
                            ref={textFieldRef}
                            autoComplete='off'
                        />
                        {/* <Box sx={{ height: 48, width: 48, borderRadius: 2.0, backgroundColor: theme.palette.primary.main }}>
                                <Stack sx={{ height: '100%', width: '100%' }} alignItems={'center'} justifyContent={'center'}>
                                    <IconButton onClick={handleSendMessage} >
                                        <SendIcon sx={{ color: blue[50] }} />
                                    </IconButton>
                                </Stack>
                            </Box> */}
                        <LoadingButton
                            onClick={handleSendMessage}
                            endIcon={<SendIcon />}
                            loading={isLoading}
                            loadingPosition="end"
                            variant="contained"
                            size='large'
                        >
                            <span>Send</span>
                        </LoadingButton>
                    </Stack>
                </motion.div>
            </Box>


            <Modal
                open={openPrompt}
                onClose={() => setOpenPrompt(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack sx={promptStyle} direction={'column'} spacing={1.5} alignItems={'center'}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
                        <Stack
                            sx={{ width: '100%', padding: '0 10px 0' }}
                            direction={'row'}
                            spacing={3}
                            justifyContent={'flex-start'}
                            alignItems={'center'}>
                            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                                Prompts
                            </Typography>
                        </Stack>
                        <Button
                            variant='outlined'
                            sx={{ height: '50px', width: '50px', borderRadius: '30px', border: 'solid 1px' }}
                            color='error'
                            onClick={() => setOpenPrompt(false)} >
                            <CloseIcon />
                        </Button>
                    </Stack>
                    <Grid container spacing={2}>
                        {renderPrompts()}
                    </Grid>
                </Stack>
            </Modal>
        </Stack>
    )
}

