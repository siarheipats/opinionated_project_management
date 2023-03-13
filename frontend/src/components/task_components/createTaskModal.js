import React, { useState } from "react";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

const yesterday = dayjs().subtract(0, 'day');

const CreateTaskModal = ({ boardId, columns, showModal, handleCloseModal }) => {
    let date = new Date();
    const [taskName, setTaskName] = useState("");
    const [taskInfo, setTaskInfo] = useState("");
    const [taskDueDate, setDueDate] = React.useState(date.getDate());
    const [column, setColumn] = useState(0);

    const handleClose = () => {
        showModal = false;
        setTaskName("");
        setTaskInfo("");
        setColumn();
        handleCloseModal();
    };

    const handleChange = (event) => {
        setColumn(event.target.value);
    };

    const newTask = async (columnId, taskName, taskInfo, taskDueDate) => {
        const response = await fetch('/api/task/create/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boardId, columnId, taskName, taskInfo, taskDueDate })
        });

        const json = await response.json();

        if (response.ok) {

        }
    }

    const handleCreateTask = async (e) => {
        e.preventDefault();
        await newTask(column, taskName, taskInfo, new Date(taskDueDate).toISOString().slice(0, 19).replace('T', ' '));
        handleClose();
    }

    return (
        <Modal
            open={showModal}
            width={500}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add New Task:
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Column: {column}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box component="form" sx={{ mt: 1 }} onSubmit={handleCreateTask}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Task Name"
                            autoFocus
                            onChange={(e) => setTaskName(e.target.value)}
                            value={taskName}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    required
                                    label="Due Date"
                                    defaultValue={yesterday}
                                    disablePast
                                    onChange={(newValue) => setDueDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Task Desription"
                            autoFocus
                            onChange={(e) => setTaskInfo(e.target.value)}
                            value={taskInfo}
                            multiline
                            rows={4}
                        />

                        <FormControl fullWidth required sx={{ pt: 2 }}>
                            <InputLabel sx={{ pt: 2.5 }}>Column</InputLabel>
                            <Select
                                value={column}
                                label="Column"
                                onChange={handleChange}
                                required
                            >
                                {
                                    columns.map((column, index) => {
                                        return (
                                            <MenuItem value={column.columnId}>{column.columnName}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
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