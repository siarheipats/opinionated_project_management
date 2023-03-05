import { React, useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

// MUI
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import CreateWorkspaceModal from './workspace_components/createWorkspaceModal';
import WorkspacesList from '../components/workspace_components/workspacesList';

const Workspaces = ({setSelectedWorkspace}) => {
    const { user } = useAuthContext();
    const [workspaces, setWorkspaces] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const theme = createTheme();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Get All Workspaces
    useEffect(() => {
        const fetchWorkspaces = async () => {
            const response = await fetch(`/api/workspace/workspaces/${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            if (response.ok) {
                setWorkspaces(json);
            }
        }
        fetchWorkspaces();
    }, []);
    
    const updateWorkspaces = () => {
        const fetchWorkspaces = async () => {
            const response = await fetch(`/api/workspace/workspaces/${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            if (response.ok) {
                setWorkspaces(json);
            }
        }
        fetchWorkspaces();
    }

    const addWorkspaces = (workspace) => {
        workspaces.push(workspace);
        setWorkspaces(workspaces);
        handleCloseModal();
    }

    const deleteWorkspace = async (workspaceId) => {
        const response = await fetch('/api/workspace/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ workspaceId })
        });
        if (response.ok) {
            const newWorkspaces = workspaces.filter(m => m.workspaceId !== workspaceId)
            setWorkspaces(newWorkspaces);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <WorkspacesIcon />
                    </Avatar>
                    <Typography component="h5" variant="h5">
                        Workspaces
                    </Typography>
                </Box>
            </Container>
            <Button onClick={handleOpenModal}>
                <AddIcon />
                Create New Workspace
            </Button>
            <WorkspacesList
                workspacesList={workspaces}
                deleteWorkspace={deleteWorkspace}
                updateWorkspaces={updateWorkspaces}
                setSelectedWorkspace={setSelectedWorkspace}
            />
            <CreateWorkspaceModal
                userId={user.user.customerId}
                showModal={showModal}
                handleCloseModalFunction={handleCloseModal}
                addWorkspaces={addWorkspaces} />
        </ThemeProvider>
    );
}

export default Workspaces;