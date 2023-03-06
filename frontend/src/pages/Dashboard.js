import * as React from 'react';
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

const drawerWidth = 240;




const Dashboard = () => {
    const [showSettings, setShowSettings] = React.useState();
    const [showWorkspaces, setShowWorkspaces] = React.useState();
    const [showDashboardMain, setShowDashboardMain] = React.useState(true);
    const [openedWorkspace, setOpenedWorkspace] = React.useState();

    function setSelectedWorkspace(workspace) {
        setOpenedWorkspace(workspace);
        goHome();
    }

    function closeWorkspace() {
        setOpenedWorkspace();
    }

    function goHome() {
        setShowDashboardMain(true);
        setShowSettings(false);
        setShowWorkspaces(false);
    }

    function showSettingsScreen() {
        setShowSettings(true);
        setShowWorkspaces(false);
        setShowDashboardMain(false);
    }

    function showWorkspacesScreen() {
        setShowWorkspaces(true);
        setShowSettings(false);
        setShowDashboardMain(false);
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
                            <ListItemButton>
                                <ListItemIcon>
                                    <CircleNotificationsOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Notifications'} />
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
                            showSettings ? <Settings /> : null
                        }
                        {
                            showWorkspaces ? <Workspaces
                                setSelectedWorkspace={setSelectedWorkspace} /> : null
                        }
                        {
                            showDashboardMain ? <DashboardMain openedWorkspace={openedWorkspace} closeWorkspace={closeWorkspace} /> : null
                        }
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard;