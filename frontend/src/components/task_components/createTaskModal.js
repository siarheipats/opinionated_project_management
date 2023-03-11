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

const CreateTaskModal = ({ boardId, showModal, handleCloseModalFunction, addTask }) => {
    const [boardName, setTaskName] = useState("");

    const handleClose = () => {
        showModal = false;
        setTaskName("Task");
        handleCloseModalFunction();
    };

    const newTask = async (taskName, boardId) => {
        const response = await fetch('/api/task/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName, taskId })
        });

        const json = await response.json();

        if (response.ok) {
            addTasks(json);
            handleClose();
        }
    }

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        await newBoard(taskName, boardId);
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
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleCreateBoard}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            onChange={(e) => setTaskName(e.target.value)}
                            value={taskName}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} >
                            Add
                        </Button>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    )
}

export default CreateTaskModal;