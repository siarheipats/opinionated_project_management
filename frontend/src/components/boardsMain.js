import { React, useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const BoardsMain = () => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Button>
                <AddIcon />
                Create Board
            </Button>
        </ThemeProvider>
    )
}

export default BoardsMain;