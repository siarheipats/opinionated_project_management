import { React, useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

// MUI
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CreateWorkspaceModal from './workspace_components/createWorkspaceModal';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Workspaces = (props) => {
    const { user } = useAuthContext();
    const [workspaces, setWorkspaces] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const theme = createTheme();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            const response = await fetch(`/api/workspace/workspaces/${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            //console.log(json);
            if (response.ok) {
                setWorkspaces(json);
            }
        }
        fetchWorkspaces();
    }, []);

    const addWorkspaces = (workspace)=> {
        workspaces.push(workspace);
        setWorkspaces(workspaces);
        handleCloseModal();
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <WorkspacesIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Your Workspaces
                    </Typography>
                </Box>
            </Container>
            <Button onClick={handleOpenModal}>
                <AddIcon />
                Create New Workspace
            </Button>
            <Container component="main" maxWidth="xs">
                <Stack spacing={2} direction='row'>
                    {workspaces && workspaces.map((workspace) => (
                        <Item key={workspace.workspaceId}>
                            <p>{workspace.workspaceName}</p>
                            <p>Created: {workspace.dateCreated}</p>
                            <Button>Open</Button>
                        </Item>
                    ))}
                </Stack>
            </Container>
            <CreateWorkspaceModal
                userId={user.user.customerId}
                showModal={showModal}
                handleCloseModalFunction={handleCloseModal} 
                addWorkspaces={addWorkspaces}/>
        </ThemeProvider>
    );
}

export default Workspaces;