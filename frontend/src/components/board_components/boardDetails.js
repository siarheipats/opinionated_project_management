import { React, useState } from 'react';

import { Drawer, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateColumnModal from '../columns_components/createColumnModal';
import ColumnList from '../columns_components/columnList';

const BoardsDetails = ({ board, columns, setColumns, isDrawerOpen, setIsDrawerOpen }) => {
    const [showModal, setShowModal] = useState(false);
    const theme = createTheme();

    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const addColumn = (column) => {
        columns.push(column);
        setColumns(columns);
        handleCloseModal();
    }

    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor="right" PaperProps={{ sx: { width: "95%" } }} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2}>
                    <h3>{board.boardName}</h3>
                    <Button onClick={handleOpenModal}>
                        <AddIcon />
                        Add Column
                    </Button>
                    <Button>
                        <AddIcon />
                        Add Task
                    </Button>
                    <Typography>
                        <ColumnList columns={columns} setColumns={setColumns} />
                    </Typography>
                </Box>
            </Drawer>
            <CreateColumnModal boardId={board.boardId} showModal={showModal} handleCloseModal={handleCloseModal} addColumn={addColumn} />
        </ThemeProvider>
    )
}

export default BoardsDetails;