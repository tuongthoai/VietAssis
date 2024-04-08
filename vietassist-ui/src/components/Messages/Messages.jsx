import React, { useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { EmptyMessage, TextMsg, Timeline } from './MessageType';

export default function Messages({ chatHistory }) {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {chatHistory.map(e => {
                    switch (e.type) {
                        case "divider":
                            return <Timeline e={e} />
                        case "msg":
                            switch (e.subtype) {
                                case "img":
                                    break;
                                case "doc":
                                    break;
                                case "link":
                                    break;
                                case "reply":
                                    break;
                                default:
                                    return <TextMsg e={e} />
                            }
                            break;

                        case "empty":
                            return <EmptyMessage />
                        default:
                            return <></>
                    }
                })}


            </Stack>
        </Box>
    )
}
