import { React, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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