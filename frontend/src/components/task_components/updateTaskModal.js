import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const UpdateTaskModal = ({ taskId, taskName, taskInfo, taskDueDate, showModal, handleCloseModal, updateTask }) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(taskName);
    const [updatedTaskInfo, setUpdatedTaskInfo] = useState(taskInfo);
    const [updatedTaskDueDate, setUpdatedTaskDueDate] = useState(taskDueDate);

    const handleUpdateTask = async () => {
        const updatedTask = {
            taskId,
            taskName: updatedTaskName,
            taskInfo: updatedTaskInfo,
            taskDueDate: updatedTaskDueDate,
        };
        await updateTask(updatedTask);
        handleCloseModal();
    };

    return (
        <Dialog open={showModal} onClose={handleCloseModal}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Task Name"
                    type="text"
                    fullWidth
                    value={updatedTaskName}
                    onChange={(e) => setUpdatedTaskName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Task Info"
                    type="text"
                    fullWidth
                    value={updatedTaskInfo}
                    onChange={(e) => setUpdatedTaskInfo(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Task Due Date"
                    type="date"
                    fullWidth
                    value={updatedTaskDueDate}
                    onChange={(e) => setUpdatedTaskDueDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button onClick={handleUpdateTask}>Update Task</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateTaskModal;