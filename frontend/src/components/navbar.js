import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';


const Navbar = ({ notifications }) => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        OPM
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {user && (
                            <div>
                                <Badge badgeContent={notifications.length} color="primary" sx={{ mr: 3 }}>
                                    <NotificationsOutlinedIcon color="white" />
                                </Badge>
                                <Button sx={{ color: '#fff' }} onClick={handleLogout}>
                                    Log Out
                                </Button>
                            </div>
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