import { React, useState } from 'react';

import { Drawer, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateColumnModal from '../columns_components/createColumnModal';
import ColumnList from '../columns_components/columnList';
import CreateTaskModal from '../task_components/createTaskModal';

const BoardsDetails = ({ board, columns, setColumns, isDrawerOpen, setIsDrawerOpen, updateTasks }) => {
    const [addColumnModal, setAddColumnModal] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const theme = createTheme();

    const handleOpenAddColumnModal = () => {
        setAddColumnModal(true);
    }
    const handleCloseAddColumnModal = () => {
        setAddColumnModal(false);
    }

    const handleOpenAddTaskModal = () => {
        setAddTaskModal(true);
    }
    const handleCloseAddTaskModal = () => {
        setAddTaskModal(false);
    }

    const addColumn = (column) => {
        columns.push(column);
        setColumns(columns);
        handleCloseAddColumnModal();
    }

    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor="right" PaperProps={{ sx: { width: "95%" } }} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2}>
                    <h3>{board.boardName}</h3>
                    <Button onClick={handleOpenAddColumnModal}>
                        <AddIcon />
                        Add Column
                    </Button>
                    <Button onClick={handleOpenAddTaskModal}>
                        <AddIcon/>
                        Add Task
                    </Button>
                    <Typography>
                        <ColumnList columns={columns} setColumns={setColumns} updateTasks={updateTasks} />
                    </Typography>
                </Box>
            </Drawer>
            <CreateColumnModal boardId={board.boardId} showModal={addColumnModal} handleCloseModal={handleCloseAddColumnModal} addColumn={addColumn} />
            <CreateTaskModal boardId={board.boardId} columns={columns} showModal={addTaskModal} handleCloseModal={handleCloseAddTaskModal}/>
        </ThemeProvider>
    )
}

export default BoardsDetails;