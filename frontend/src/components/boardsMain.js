import { React, useEffect, useState } from 'react';
import '../components/board_components/createBoardModal'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const BoardsMain = (workspaceId) => {
    const [boards, setboards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {});
    const theme = createTheme();

    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <Button onClick={handleOpenModal}>
                <AddIcon />
                Create Board
            </Button>
            <CreateBoardModal
            workspaceId = {workspaceId}
            showModal = {showModal}
            handleCloseModalFunction = {handleCloseModel}
            />
        </ThemeProvider>
    )
}

export default BoardsMain;