import { React, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import EditColumnModal from './editColumnModal';
import TaskDetails from '../task_components/taskDetails';


const ColumnList = ({ columns, setColumns, updateTasks, handleUpdateTasks }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState([]);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [columnToEdit, setColumnToEdit] = useState(0);
    const theme = createTheme();

    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOpenTaskDetail = (task) => {
        setSelectedTask(task);
        setShowTaskDetails(true);
    }

    const handlCloseTaskDetail = () => {
        setShowTaskDetails(false);
    }

    const deleteColumn = async (columnId) => {
        const response = await fetch('/api/column/deletecolumn/', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ columnId })
        });
        if (response.ok) {
            const newColumns = columns.filter(m => m.columnId !== columnId);
            setColumns(newColumns);
        }
    }

    const handleEditColumn = (column) => {
        setColumnToEdit(column);
        handleOpenModal();
    }

    function getFormattedDate(date) {
        var javaDate = new Date(date);
        return javaDate.toDateString();
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={1} wrap="nowrap">
                        {columns?.map((column, index) => (
                            <Grid key={index} item>
                                <Paper
                                    sx={{
                                        height: column.length * 150,
                                        width: 300,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                >
                                    <Card sx={{ width: 300 }}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    <Grid container>
                                                        <Grid item>
                                                            <Typography gutterBottom variant="h6" component='div'>
                                                                {column.columnName}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Grid container direction="row-reverse">
                                                                <Grid item pl={1}>
                                                                    <DeleteIcon onClick={() => deleteColumn(column.columnId)} />
                                                                </Grid>
                                                                <Grid item pr={1}>
                                                                    <EditIcon onClick={() => handleEditColumn(column)} />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </CardContent>
                                    </Card>

                                    {column.tasks.map((task, index) => (
                                        <Typography variant="body2" color="text.secondary" justifyContent='center' sx={{p:2}}>
                                            <Card sx={{ width: 270 }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Typography gutterBottom component='div'>
                                                            {task.taskName}
                                                        </Typography>
                                                        <Typography variant='body2' color='text.secondary'>
                                                            Due Date: {getFormattedDate(task.taskDueDate)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button size='small' color='primary' onClick={() => handleOpenTaskDetail(task)}>
                                                        Details
                                                    </Button>
                                                </CardActions>
                                            </Card>

                                        </Typography>
                                    ))}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <TaskDetails task={selectedTask} showTaskDetails={showTaskDetails} handleCloseTaskDetails={handlCloseTaskDetail} updateTasks={updateTasks} handleUpdateTasks={handleUpdateTasks}/>
            <EditColumnModal showModal={showModal} handleCloseModal={handleCloseModal} />
        </ThemeProvider>
    )
}

export default ColumnList;