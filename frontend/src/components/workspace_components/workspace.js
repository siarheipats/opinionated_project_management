import React from 'react';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText'

const Workspace = ({ workspaceDetails, deleteWorkspace }) => {
    const workspaceId = workspaceDetails.workspaceId;

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteWorkspace(workspaceDetails.workspaceId)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={workspaceDetails.workspaceName}
                secondary={workspaceDetails.dateCreated}
            />
        </ListItem>

    )
}

export default Workspace;