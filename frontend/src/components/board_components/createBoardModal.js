import React, { useState } from "react";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const style = {
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

const CreateBoardModal = ({ workspaceId, showModal, handleCloseModalFunction, addBoards }) => {
    const [boardName, setBoardName] = useState("");

    const handleClose = () => {
        showModal = false;
        setBoardName("");
        handleCloseModalFunction();
    };

    const newBoard = async (boardName, workspaceId) => {
        const response = await fetch('/api/board/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boardName, workspaceId })
        });

        const json = await response.json();

        if (response.ok) {
            addBoards(json);
            handleClose();
        }
    }

    const handleCreateWorkspace = async (e) => {
        e.preventDefault();
        await newBoard(boardName, workspaceId);
        handleClose();
    }


    return (
        <Modal
            open={showModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create New Board:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleCreateWorkspace}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            onChange={(e) => setBoardName(e.target.value)}
                            value={boardName}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add
                        </Button>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    )
}

export default CreateBoardModal;