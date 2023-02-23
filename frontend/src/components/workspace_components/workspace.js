import React from 'react';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText'
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const Workspace = ({ workspaceDetails, deleteWorkspace, editWorkspace, setWorkspaceToEdit, setSelectedWorkspace }) => {
    return (
        <ListItem
            secondaryAction={
                <div>
                    <IconButton edge="end" aria-label="open" style={{ margin: 5 }}>
                        <OpenInNewIcon onClick={() => setSelectedWorkspace(workspaceDetails)} />
                    </IconButton>
                    <IconButton edge="end" aria-label="edit" style={{ margin: 5 }}>
                        <EditIcon onClick={() => {
                            editWorkspace(workspaceDetails);
                            setWorkspaceToEdit(workspaceDetails)
                        }}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => deleteWorkspace(workspaceDetails.workspaceId)} />
                    </IconButton>
                </div>
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