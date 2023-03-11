import { React, useEffect, useState } from 'react';

import { Drawer, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateColumnModal from '../columns_components/createColumnModal';

const BoardsDetails = ({ board, isDrawerOpen, setIsDrawerOpen }) => {
    const [showModal, setShowModal] = useState(false);
    const theme = createTheme();

    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor="right" PaperProps={{ sx: { width: "95%" } }} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2}>
                    <h3>{board.boardName}</h3>
                    <Button onClick={handleOpenModal}>
                        <AddIcon />
                        Add Column
                    </Button>
                    <Typography>

                    </Typography>
                </Box>
            </Drawer>
            <CreateColumnModal boardId={board.boardId} showModal={showModal} handleCloseModal={handleCloseModal}/>
        </ThemeProvider>
    )
}

export default BoardsDetails;