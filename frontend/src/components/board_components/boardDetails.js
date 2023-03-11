import React from "react";

import { Drawer, Box, Typography, IconButton } from '@mui/material';

const BoardsDetails = ({ board, isDrawerOpen, setIsDrawerOpen }) => {

    return (
        <Drawer anchor="right" PaperProps={{ sx: { width: "95%" } }} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <Box p={2}>
                <Typography>
                    <h6>{board.boardName}</h6>
                </Typography>
            </Box>
        </Drawer>
    )
}

export default BoardsDetails;