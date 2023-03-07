import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import React from 'react';
// MUI
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import CreateWorkspaceModal from './workspace_components/createWorkspaceModal';
import WorkspacesList from '../components/workspace_components/workspacesList';
import SharedWorkspaces from './peopleWorkspace_components/sharedWorkspaces';

const Workspaces = ({ setSelectedWorkspace }) => {
    const { user } = useAuthContext();
    const [workspaces, setWorkspaces] = useState([]);
    const [sharedWorkspaces, setSharedWorkspaces] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    const theme = createTheme();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

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

        const fetchSharedWorkspaces = async () => {
            const response = await fetch(`api/shared/getsharedworkspaces/?customerId=${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            if (response.ok) {
                setSharedWorkspaces(json);
            }
        }
        fetchWorkspaces();
        fetchSharedWorkspaces();
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Your Workspaces" {...a11yProps(0)} />
                    <Tab label="Shared with you" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <WorkspacesList
                        workspacesList={workspaces}
                        deleteWorkspace={deleteWorkspace}
                        updateWorkspaces={updateWorkspaces}
                        setSelectedWorkspace={setSelectedWorkspace}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <SharedWorkspaces
                        sharedWorkspaces={sharedWorkspaces}
                        setSelectedWorkspace={setSelectedWorkspace}
                    />
                </TabPanel>
            </Box>
            <CreateWorkspaceModal
                userId={user.user.customerId}
                showModal={showModal}
                handleCloseModalFunction={handleCloseModal}
                addWorkspaces={addWorkspaces} />
        </ThemeProvider>
    );
}

export default Workspaces;