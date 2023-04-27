import React, { useState } from 'react';
import Workspace from '../workspace_components/workspace';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import EditWorkspaceModal from './editWorkspaceModal';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const WorkspacesList = ({ workspacesList, deleteWorkspace, updateWorkspaces, setSelectedWorkspace }) => {
    const [workspaceToEdit, setWorkspaceToEdit] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const theme = createTheme();

    const handleOpenModal = (workspace) => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        updateWorkspaces();
        setShowModal(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                {
                    workspacesList.length === 0 && <div>You don't have any Workspaces created.</div>
                }
                {
                    workspacesList.length > 0 &&
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Demo>
                                <List dense={false}>
                                    {workspacesList.map((workspace, index) =>
                                        <Workspace
                                            workspaceDetails={workspace}
                                            deleteWorkspace={deleteWorkspace}
                                            editWorkspace={handleOpenModal}
                                            setWorkspaceToEdit={setWorkspaceToEdit}
                                            setSelectedWorkspace={setSelectedWorkspace} />
                                    )}
                                </List>
                            </Demo>
                        </Grid>
                    </Grid>
                }
                <EditWorkspaceModal
                    showModal={showModal}
                    handleCloseModalFunction={handleCloseModal}
                    workspaceToEdit={workspaceToEdit}
                />
            </Box>
        </ThemeProvider>
    )
}

export default WorkspacesList;