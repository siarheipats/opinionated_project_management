import { React, useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

// MUI
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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
    const [workspaceName, setWorkspaceName] = useState("");
    const [openCreateNewWorkspace, setOpenCreateNewWorkspace] = useState(false);

    const handleOpenCreateNewWorkspace = () => setOpenCreateNewWorkspace(true);
    const handleCloseCreateNewWorkspace = () => setOpenCreateNewWorkspace(false);

    const theme = createTheme();

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

    const newWorkspace = async (workspaceName, customerId) => {
        const response = await fetch('/api/workspace/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ workspaceName, customerId })
        });

        const json = await response.json();

        if (response.ok) {
            return json;
        }
    }

    const handleCreateWorkspace = async (e) => {
        e.preventDefault();
        var response = await newWorkspace(workspaceName, user.user.customerId);
        workspaces.push(response);
        handleCloseCreateNewWorkspace();
        setWorkspaces(workspaces);
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
            <Button onClick={handleOpenCreateNewWorkspace}>
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
            <Modal
                open={openCreateNewWorkspace}
                onClose={handleCloseCreateNewWorkspace}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Workspace:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleCreateWorkspace}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                autoFocus
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                value={workspaceName}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}

export default Workspaces;