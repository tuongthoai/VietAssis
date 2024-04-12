import React from 'react'
import { Stack, Divider, Typography, Box } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

const TextMsg = ({ e }) => {
    return (
        <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
            <Box
                p={1.5}
                sx={{ backgroundColor: e.incoming ? grey[50] : blue[900], width: 'max-content', maxWidth: "750px" }}
                borderRadius={1.5}>
                <Typography variant='body2' color={e.incoming ? grey[900] : grey[50]}>
                    {e.message}
                </Typography>

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

export { Timeline, TextMsg, EmptyMessage }