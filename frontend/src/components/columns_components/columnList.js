import { React, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import EditColumnModal from './editColumnModal';


const ColumnList = ({ columns, setColumns }) => {
    const [showModal, setShowModal] = useState(false);
    const [columnToEdit, setColumnToEdit] = useState(0);
    const theme = createTheme();

    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const deleteColumn = async (columnId) => {
        const response = await fetch('/api/column/deletecolumn/', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ columnId })
        });

        const json = await response.json();

        if (response.ok) {
            const newColumns = columns.filter(m => m.columnId !== columnId);
            setColumns(newColumns);
        }
    }

    const handleEditColumn = (column) => {
        setColumnToEdit(column);
        handleOpenModal();
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={1} wrap="nowrap">
                        {columns.map((column, index) => (
                            <Grid key={index} item>
                                <Paper
                                    sx={{
                                        height: 5 * 100,
                                        width: 300,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                >
                                    <Card sx={{ width: 300 }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    <Grid container>
                                                        <Grid item>
                                                            <h7>{column.columnName}</h7>
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
                                        </CardActionArea>
                                    </Card>
                                    <Typography variant="body2" color="text.secondary">
                                        {column.tasks.map((task, index) => (
                                            <Card sx={{ width: 300, justifyContent: 'center' }}>
                                                <CardContent>
                                                    <p>{task.taskName}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <EditColumnModal showModal={showModal} handleCloseModal={handleCloseModal} />
        </ThemeProvider>
    )
}

export default ColumnList;