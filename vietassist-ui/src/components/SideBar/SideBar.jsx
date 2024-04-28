import {
    AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List,
    ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,
    Typography
} from '@mui/material'
import React, { useState } from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox'; // Import Inbox icon
import MailIcon from '@mui/icons-material/Mail'; // Import Mail icon
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { blue, grey, lightBlue } from '@mui/material/colors'
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Conversation from '../Conversation/Conversation';



export default function SideBar() {
    // const drawerWidth = 240;
    // const [open, setOpen] = useState(true);
    // const toggleMenu = () => {
    //     setOpen(open ? false : true);
    //     console.log(open);
    // }
    // const openMenu = () => {
    //     setOpen(true);
    // }
    // const closeMenu = () => {
    //     setOpen(false);
    // }

    // return (
    //     <Box>
    //         <AppBar
    //             position="fixed"
    //             sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: lightBlue[900] }}
    //         >
    //             <Toolbar>
    //                 <Button
    //                     variant="contained"
    //                     color={'warning'}
    //                     onClick={toggleMenu}>
    //                     <MenuOpenIcon />
    //                 </Button>
    //                 <Typography sx={{ textAlign: 'center', width: '100%', fontWeight: 'bold', letterSpacing: 4 }} color={grey[50]} variant="h4" component="div">
    //                     VietAssist
    //                 </Typography>
    //             </Toolbar>
    //         </AppBar>
    //         <Drawer
    //             sx={{
    //                 width: drawerWidth,
    //                 flexShrink: 0,
    //                 '& .MuiDrawer-paper': {
    //                     width: drawerWidth,
    //                     boxSizing: 'border-box',
    //                 },
    //             }}
    //             anchor="left"
    //             open={open}
    //         >
    //             {/* <Toolbar />
    //             <Divider /> */}
    //             <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu}>
    //                 <List>
    //                     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //                         <ListItem key={text} disablePadding>
    //                             <ListItemButton>
    //                                 <ListItemIcon>
    //                                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //                                 </ListItemIcon>
    //                                 <ListItemText primary={text} />
    //                             </ListItemButton>
    //                         </ListItem>
    //                     ))}
    //                 </List>
    //                 <Divider />
    //                 <List>
    //                     {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //                         <ListItem key={text} disablePadding>
    //                             <ListItemButton>
    //                                 <ListItemIcon>
    //                                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //                                 </ListItemIcon>
    //                                 <ListItemText primary={text} />
    //                             </ListItemButton>
    //                         </ListItem>
    //                     ))}
    //                 </List>
    //             </Box>
    //         </Drawer>
    //     </Box>
    // )

    const drawerWidth = 240;
    const minHeight = 64;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(0),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            // marginTop: `${theme.mixins.toolbar.minHeight}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
            // height: `calc(100vh - 56px)`,
            // overflowY: 'scroll',
        }),
    );

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuOpenIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open} sx={{ bgcolor: blue[100] }}>
                <DrawerHeader />
                <Conversation />
            </Main>
        </Box >
    );
}
