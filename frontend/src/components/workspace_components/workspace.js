import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const theme = createTheme();

const Workspace = ({ workspaceDetails, deleteWorkspace, editWorkspace, setWorkspaceToEdit, setSelectedWorkspace }) => {

    return (
        <ThemeProvider theme={theme}>
            <Demo>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={workspaceDetails.workspaceName}
                        secondary={workspaceDetails.dateCreated}
                    />
                    <Button
                        sx={{ ml: 1 }}
                        variant="contained"
                        color="secondary"
                        startIcon={<OpenInNewIcon />}
                        onClick={async (e) => { setSelectedWorkspace(workspaceDetails) }}
                    > Open
                    </Button>
                    <Button
                        sx={{ ml: 1 }}
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon />}
                        onClick={async (e) => {
                            editWorkspace(workspaceDetails);
                            setWorkspaceToEdit(workspaceDetails)
                        }}
                    > Edit
                    </Button>
                    <Button sx={{ ml: 1 }}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={async (e) => { deleteWorkspace(workspaceDetails.workspaceId) }}>
                        Delete
                    </Button>
                </ListItem >
            </Demo>
        </ThemeProvider>
    )
}

export default Workspace;