import React from "react";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Notifications = ({ notifications }) => {
    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Paper style={{ overflow: 'auto' }}>
                    <List>
                        {
                            notifications?.map((notification, i) =>
                                <ListItem
                                    secondaryAction={
                                        <div>
                                            <IconButton edge="end" aria-label="open" style={{ margin: 5 }}>
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete">
                                                <ClearIcon />
                                            </IconButton>
                                        </div>
                                    }>
                                    <ListItemText key={i}
                                        primary={`You are invited to collaborate on ${notification.workspaceName} workspace.`}
                                    />
                                </ListItem>
                            )}
                    </List>
                </Paper>
            </Box>
        </React.Fragment>
    )
}

export default Notifications;