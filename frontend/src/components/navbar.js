import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoMdSettings } from "react-icons/io"
import { useState } from "react";
import { Link } from 'react-router-dom';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const Navbar = (props) => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleSettingsClick = () => {
        props.settingsToggle();
    };



    const container = window !== undefined ? () => window().document.body : undefined;

    const handleLogout = () => {
        logout();
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        OPM
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {user && (
                            <Button sx={{ color: '#fff' }} onClick={handleLogout}>
                                Log Out
                            </Button>
                        )}
                        {!user && (
                            <div>
                                <Link to="/login">
                                    <Button sx={{ color: '#fff' }}>
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button sx={{ color: '#fff' }}>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;