import React, { useState } from "react";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UpdateTaskModal from './updateTaskModal';

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

const TaskDetails = ({ task, setTask, showTaskDetails, handleCloseTaskDetails, updateTasks, handleUpdateTasks }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleClose = () => {
        showTaskDetails = false;
        handleCloseTaskDetails();
    }

    function getFormattedDate(date) {
        var javaDate = new Date(date);
        return javaDate.toDateString();
    }

    const deleteTask = async (taskId) => {
        const response = await fetch("/api/task/deleteTask", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId }),
        });

        if (response.ok) {
            updateTasks(taskId);
        }
    };

    const handleDelete = () => {
        deleteTask(task.taskId);
        handleClose();
    };

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    return (
        <>
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
                    <Typography id="modal-modal-description" sx={{ mt: 2, pb: 5 }}>
                        <b>Details:</b> {task.taskInfo}
                    </Typography>
                    <Button onClick={handleOpenUpdateModal} variant="contained" color="primary" sx={{ mr: 1 }}>Edit</Button>
                    <Button onClick={handleDelete} color="error" variant="outlined" sx={{ mr: 1 }}>Delete</Button>
                    <Button onClick={handleClose} variant="outlined">Close</Button>
                </Box>
            </Modal>
            <UpdateTaskModal
                taskId={task.taskId}
                boardId={task.boardId}
                columnId={task.columnId}
                taskName={task.taskName}
                taskInfo={task.taskInfo}
                taskDueDate={task.taskDueDate}
                showModal={showUpdateModal}
                handleCloseModal={handleCloseUpdateModal}
                updateTask={updateTasks}
                handleUpdateTasks={handleUpdateTasks}
                setTask={setTask}
            />
        </>
    )
}

export default TaskDetails;