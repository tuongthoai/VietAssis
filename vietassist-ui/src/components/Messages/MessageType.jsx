import React from 'react'
import { Stack, Divider, Typography, Box, Skeleton } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import ReactMarkdown from 'react-markdown'

const TextMsg = ({ e }) => {
    return (
        <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
            <Box
                p={2}
                sx={{ backgroundColor: e.incoming ? grey[200] : blue[900], width: 'max-content', maxWidth: "750px" }}
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
                            color={e.incoming ? grey[900] : grey[50]}
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
        <Box sx={{ width: '100%', height: '450px' }}>
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