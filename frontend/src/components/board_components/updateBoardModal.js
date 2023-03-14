import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateBoardModal = ({ board, handleUpdateBoardName, handleCloseModalFunction, showModal }) => {
    const [newBoardName, setNewBoardName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateBoardName(board.boardId, newBoardName);
        handleCloseModalFunction();
    }

    const handleBoardNameChange = (event) => {
        setNewBoardName(event.target.value);
    }

    return (
        <Modal
            open={showModal}
            onClose={handleCloseModalFunction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Board Name"
                        defaultValue={board.boardName}
                        onChange={handleBoardNameChange}
                    />
                    <br /><br />
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}

export default UpdateBoardModal;