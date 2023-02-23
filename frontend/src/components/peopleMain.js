import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/// Components
import PeopleSearchModal from "../components/peopleWorkspace_components/peopleSearchModal";

const PeopleMain = () => {

    const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);
    const theme = createTheme();

    const handleOpenModal = () => setShowAddPeopleModal(true);
    const handleCloseModal = () => setShowAddPeopleModal(false);

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={handleOpenModal}>
                <AddIcon />
                Add People
            </Button>

            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                No users for this project yet
            </Typography>
            <PeopleSearchModal
                showModal={showAddPeopleModal}
                handleCloseModal={handleCloseModal} />
        </ThemeProvider>
    )
}

export default PeopleMain;