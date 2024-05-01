import React from 'react'
import {
    Stack, Divider, Typography, Box, Skeleton,
    Avatar
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import ReactMarkdown from 'react-markdown'

const TextMsg = ({ e }) => {
    return (
        <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'} alignItems={'center'}>
            {e.incoming && <Avatar src='bot.png' sx={{ bgcolor: blue[700] }}>V</Avatar>}
            <Box
                p={2}
                margin={'0 10px'}
                sx={{ backgroundColor: e.incoming ? '#f0f4f9' : blue[900], width: 'max-content', maxWidth: "750px" }}
                borderRadius={1.5}>
                {e.incoming === false ? (
                    <Typography variant='body2' color={e.incoming ? grey[900] : grey[50]}>
                        {e.message}
                    </Typography>
                ) : (
                    <>
                        <Typography
                            variant='body2'
                            paddingLeft={1}
                            color={e.incoming ? grey[700] : grey[50]}
                        >
                            <ReactMarkdown>{e.message}</ReactMarkdown>
                        </Typography>
                        {e.isLoading === true ? (
                            <>
                                <Skeleton sx={{ marginLeft: '10px' }} animation="wave" width={"90%"} />
                                <Skeleton sx={{ marginLeft: '10px' }} animation="wave" width={"90%"} />
                                <Skeleton sx={{ marginLeft: '10px' }} animation="wave" width={"60%"} />
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </Box>
            {e.outgoing && <Avatar src='cat.png' sx={{ bgcolor: grey[50] }}>QA</Avatar>}
        </Stack>
    )
}

const Timeline = ({ e }) => {
    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Divider width="46%" />
            <Typography variant='caption'>{e.text}</Typography>
            <Divider width="46%" />

        </Stack>
    )
}

const EmptyMessage = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Stack direction={'column'} alignItems={'center'}>
                <img src='AIimage.jpg' width={'400px'} style={{ borderRadius: '20px' }} alt='AIimage' />
                <Typography textAlign={'center'} pt={3} fontSize={'70px'} color={blue[900]} fontWeight={'bold'} letterSpacing={2}>
                    Welcome to VietAssist!
                </Typography>
            </Stack>
        </Box>
    )
}

const Loader = () => {
    return (
        <>
            <Skeleton sx={{ marginLeft: '10px' }} animation="wave" width={"90%"} />
            <Skeleton sx={{ marginLeft: '10px' }} animation="wave" width={"90%"} />
            <Skeleton sx={{ marginLeft: '10px' }} animation="wave" width={"60%"} />
        </>
    )
}

export { Timeline, TextMsg, EmptyMessage, Loader }