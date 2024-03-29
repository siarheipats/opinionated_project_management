import * as React from 'react';

import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import DashboardMain from "../components/dashmain";
import Settings from "../components/settings";
import Workspaces from "../components/workspaces";
import Notifications from "../components/notifications";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const drawerWidth = 240;


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = ({ notifications, setNotifications, updateNotifications, recentlyOpened, setRecentlyOpened, fetchRecentlyOpened }) => {
    const [showSettings, setShowSettings] = useState();
    const [showWorkspaces, setShowWorkspaces] = useState();
    const [showDashboardMain, setShowDashboardMain] = useState(true);
    const [openedWorkspace, setOpenedWorkspace] = useState();
    const [showNotifications, setShowNotifications] = useState();
    const [open, setOpen] = React.useState(false);
    const { user } = useAuthContext();

    let notificationsLength = 0;
    if (notifications !== undefined || notifications !== null) {
        notificationsLength = notifications.length;
    }

    const openSuccess = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    function setSelectedWorkspace(workspace) {
        setOpenedWorkspace(workspace);
        addRecentlyOpened(workspace);
        goHome();
    }

    const addRecentlyOpened = async (workspaceData) => {
        let workspace = JSON.stringify(workspaceData);
        let recentlyOpenedId = recentlyOpened.recentlyOpenedId;
        let customerId = recentlyOpened.customerId;
        const response = await fetch('/api/recentlist/recentlist/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recentlyOpenedId, customerId, workspace })
        });
        if (response.ok) {
            fetchRecentlyOpened(workspace);
        }
    }

    function closeWorkspace() {
        setOpenedWorkspace();
    }

    function goHome() {
        setShowDashboardMain(true);
        setShowSettings(false);
        setShowWorkspaces(false);
        setShowNotifications(false);
    }

    function showSettingsScreen() {
        setShowSettings(true);
        setShowWorkspaces(false);
        setShowDashboardMain(false);
        setShowNotifications(false);
    }

    function showWorkspacesScreen() {
        setShowWorkspaces(true);
        setShowSettings(false);
        setShowDashboardMain(false);
        setShowNotifications(false);
    }

    function showNotificationsScreen() {
        setShowWorkspaces(false);
        setShowSettings(false);
        setShowDashboardMain(false);
        setShowNotifications(true);
    }

    function showSettingsSuccesMessage() {
        openSuccess();
    }

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
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
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            OPM
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItem key='Home' disablePadding>
                            <ListItemButton onClick={() => goHome()}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItemButton>

                        </ListItem>
                        <ListItem key='Workspaces' disablePadding>
                            <ListItemButton onClick={() => showWorkspacesScreen()}>
                                <ListItemIcon>
                                    <WorkspacesIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Workspaces'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key='Notifications' disablePadding>
                            <ListItemButton onClick={() => showNotificationsScreen()}>
                                <ListItemIcon>
                                    <CircleNotificationsOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Notifications (${notificationsLength})`} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key={'Settings'} disablePadding>
                            <ListItemButton onClick={() => showSettingsScreen()}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Settings'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Typography paragraph>
                        {
                            showSettings ? <Settings goHome={goHome} showSettingsSuccesMessage={showSettingsSuccesMessage} /> : null
                        }
                        {
                            showWorkspaces ? <Workspaces
                                setSelectedWorkspace={setSelectedWorkspace} recentlyOpened={recentlyOpened} setRecentlyOpened={setRecentlyOpened} /> : null
                        }
                        {
                            showDashboardMain ? <DashboardMain openedWorkspace={openedWorkspace} closeWorkspace={closeWorkspace} recentlyOpened={recentlyOpened} setRecentlyOpened={setRecentlyOpened} setSelectedWorkspace={setSelectedWorkspace} /> : null
                        }
                        {
                            showNotifications ? <Notifications notifications={notifications} setNotifications={setNotifications} updateNotifications={updateNotifications} /> : null
                        }
                    </Typography>
                </Box>
            </Box>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Account changes saved
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default Dashboard;