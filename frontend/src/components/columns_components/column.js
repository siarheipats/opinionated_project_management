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
import { updateColumns } from '../../../../backend/models/columnModel';


const columns = ({ columnName, boardId,  columnId}) => {
    return (
        <ListItem
            secondaryAction={
                <div>

                    <IconButton edge="end" aria-label="Add Column" style={{ margin: 5 }}>
                        <OpenInNewIcon onClick={() => createColumns(columnName, boardId)} />
                    </IconButton>
                    <IconButton edge="end" aria-label="Edit Column" style={{ margin: 5 }}>
                        <EditIcon onClick={() => {
                            updateColumns(columnName, columnId);
                        }}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => deleteColumns(boardDetails.columnId)} />
                    </IconButton>
                </div>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
        </ListItem>
    )
}

export default Columns;