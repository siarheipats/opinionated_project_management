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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

const ColumnList = ({ columns, setColumns, updateTasks, handleUpdateTasks }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState([]);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [columnToEdit, setColumnToEdit] = useState(0);
    const [openReasignTaskScreen, setOpenReasingTaskScreen] = useState(false);
    const [selectedColumnDestination, setSelectedColumnDestination] = useState();
    const [taskToMove, setTaskToMove] = useState();
    const theme = createTheme();

    const handleOpenReassign = (task) => {
        setTaskToMove(task);
        setOpenReasingTaskScreen(true);
    }

    const handleCloseReassign = () => {
        setOpenReasingTaskScreen(false);
    }

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
                                        <Typography variant="body2" color="text.secondary" justifyContent='center' sx={{ p: 2 }}>
                                            <Card sx={{ width: 270 }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Grid container>
                                                            <Grid item>
                                                                <Typography gutterBottom component='div'>
                                                                    {task.taskName}
                                                                </Typography>
                                                                <Typography variant='body2' color='text.secondary'>
                                                                    Due Date: {getFormattedDate(task.taskDueDate)}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs>
                                                                <Grid container direction="row-reverse">
                                                                    <Grid item pl={1}>
                                                                        <MoreHorizIcon onClick={() => handleOpenReassign(task)} />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
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
            <TaskDetails task={selectedTask} showTaskDetails={showTaskDetails} handleCloseTaskDetails={handlCloseTaskDetail} updateTasks={updateTasks} handleUpdateTasks={handleUpdateTasks} />
            <EditColumnModal showModal={showModal} handleCloseModal={handleCloseModal} />
            <SimpleDialog selectedValue={selectedColumnDestination} open={openReasignTaskScreen} onClose={handleCloseReassign} columns={columns} setColumns={setColumns} task={taskToMove} />
        </ThemeProvider>
    )
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    setColumns: PropTypes.func.isRequired,
    task: PropTypes.array.isRequired,
};

function SimpleDialog(props) {
    const { onClose, selectedValue, open, columns, setColumns, task } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const updateTaskColumn = async (columnId) => {
        const taskId = task.taskId;
        const boardId = task.boardId;
        const taskName = task.taskName;
        const taskInfo = task.taskInfo;
        const taskDueDate = task.taskDueDate;

        const response = await fetch('api/task/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({taskId, boardId, columnId, taskName, taskInfo, taskDueDate})
        });

        if (response.ok) {
            onClose();
        }
    }

    const handleListItemClick = (destinationColumn) => {
        for (var i = 0; i < columns.length; i++) {
            for (var j = 0; j < columns[i].tasks.length; j++) {
                if (columns[i].tasks[j].taskId === task.taskId) {
                    columns[i].tasks.splice(j, 1);
                }
            }
            if (columns[i].columnId == destinationColumn.columnId) {
                columns[i].tasks.push(task);
            }
        }
        updateTaskColumn(destinationColumn.columnId);
        setColumns(columns);
    };



    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Move {task?.taskName} To:</DialogTitle>
            <List sx={{ pt: 0 }}>
                {columns.map((column) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(column)} key={column}>
                            <ListItemText primary={column.columnName} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default ColumnList;