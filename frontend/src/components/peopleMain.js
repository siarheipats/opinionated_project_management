import React from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const PeopleMain = () => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Button>
                <AddIcon />
                Add People
            </Button>

            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                No users for this project yet
            </Typography>
        </ThemeProvider>
    )
}

export default PeopleMain;