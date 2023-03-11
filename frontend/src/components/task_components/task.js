import React from 'react';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { updateTasks } from '../../../../backend/models/taskModel';


const tasks = ({ taskName, taskId,  boardId}) => {
    return (
        <ListItem
            secondaryAction={
                <div>

                    <IconButton edge="end" aria-label="Add task" style={{ margin: 5 }}>
                        <OpenInNewIcon onClick={() => createTasks(taskName, boardId)} />
                    </IconButton>
                    <IconButton edge="end" aria-label="Edit Task" style={{ margin: 5 }}>
                        <EditIcon onClick={() => {
                            updateTasks(taskName, taskId);
                        }}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => deleteTasks(boardDetails.taskId)} />
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

export default Tasks;