import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
const yesterday = dayjs().subtract(0, 'day');

const UpdateTaskModal = ({ taskId, boardId, columnId, taskName, taskInfo, taskDueDate, showModal, handleCloseModal, updateTask, handleUpdateTasks, setTask }) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(taskName);
    const [updatedTaskInfo, setUpdatedTaskInfo] = useState(taskInfo);
    const [updatedTaskDueDate, setUpdatedTaskDueDate] = useState(taskDueDate);

    function getFormattedDate(date) {
        var javaDate = new Date(date);
        return javaDate.toDateString();
    }

    const handleUpdateTask = async () => {
        const updatedTask = {
            taskId,
            boardId: boardId,
            columnId: columnId,
            taskName: updatedTaskName,
            taskInfo: updatedTaskInfo,
            taskDueDate: updatedTaskDueDate,
        };
        await handleUpdateTasks(updatedTask);
        setTask(updatedTask);
        setUpdatedTaskDueDate();
        setUpdatedTaskName();
        setUpdatedTaskInfo();
        handleCloseModal();
    };

    return (
        <Dialog open={showModal} onClose={handleCloseModal}>
            <DialogTitle>Update <b>{taskName}</b></DialogTitle>
            <Typography sx={{ p: 2 }}>
                Current Due Date: {getFormattedDate(taskDueDate)}
            </Typography>
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            required
                            label="Due Date"
                            defaultValue={yesterday}
                            disablePast
                            onChange={(newValue) => setUpdatedTaskDueDate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <TextField
                    margin="dense"
                    label="Task Info"
                    type="text"
                    fullWidth
                    value={updatedTaskInfo}
                    multiline
                    rows={4}
                    onChange={(e) => setUpdatedTaskInfo(e.target.value)}
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