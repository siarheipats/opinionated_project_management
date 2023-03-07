import React from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles'

const BoardsDetails = ({ board }) => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <p>board.boardName</p>
        </ThemeProvider>
    )
}

export default BoardsDetails;