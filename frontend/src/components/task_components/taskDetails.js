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
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TaskDetails = ({ task, showTaskDetails, handleCloseTaskDetails }) => {

    const handleClose = () => {
        showTaskDetails = false;
        handleCloseTaskDetails();
    }

    function getFormattedDate(date) {
        var javaDate = new Date(date);
        return javaDate.toDateString();
    }

    return (
        <Modal
            open={showTaskDetails}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {task.taskName}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <b>Due Date: </b>{getFormattedDate(task.taskDueDate)}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, pb: 5}}>
                    <b>Details:</b> {task.taskInfo}
                </Typography>
                <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    )
}

export default TaskDetails;