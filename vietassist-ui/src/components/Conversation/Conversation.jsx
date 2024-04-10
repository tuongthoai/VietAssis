import {
    Box, IconButton, InputAdornment, Stack, TextField,
    Toolbar, Typography, Modal, Card,
    CardContent, CardActions, Button, Grid
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './Conversation.css'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useTheme } from '@emotion/react';
import Messages from '../Messages/Messages';
import { blue, lightBlue, grey } from '@mui/material/colors'


export default function Conversation() {
    const [chatHistory, setChatHistory] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const chatWindowRef = useRef(null);
    const textFieldRef = useRef(null);

    const [openPrompt, setOpenPrompt] = useState(false);

    const emptyMsg = {
        type: "empty",
    }

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

    const renderPrompts = () => {
        const prompts = []
        for (let i = 0; i < 10; i++) {
            prompts.push(
                <Grid item xs={3}>
                    <Card key={i} sx={{ maxWidth: 345, padding: '10px', border: `2px solid ${blue[700]}` }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                                <Button variant='contained' color='warning'>Use</Button>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                            </Stack>
                        </CardActions>
                    </Card>
                </Grid>
            )
        }
        return prompts
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
                                    <IconButton onClick={() => setOpenPrompt(true)}>
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
                    <Box sx={{ height: 48, width: 48, borderRadius: 2.0, backgroundColor: theme.palette.primary.main }}>
                        <Stack sx={{ height: '100%', width: '100%' }} alignItems={'center'} justifyContent={'center'}>
                            <IconButton onClick={handleSendMessage} >
                                <SendIcon sx={{ color: blue[50] }} />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
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
                            <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
                                Prompts
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Tìm kiếm prompt..."
                                variant="outlined"
                                size='small'
                                sx={{ width: '30%' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />

                            <Button
                                variant="outlined"
                                color='info'
                            >Prompts yêu thích</Button>
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
