import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';

const Notifications = ({ notifications, setNotifications, updateNotifications }) => {

    const deleteInvite = (invite) => {
        const inviteId = invite.inviteId;
        const fetchDeleteInvite = async () => {
            const response = await fetch('/api/shared/deleteinvite', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inviteId })
            });
            if (response.ok) {
                const updatedNotifications = notifications.filter(m => m.inviteId !== inviteId);
                setNotifications(updatedNotifications);
            }
        }
        fetchDeleteInvite();
    }

    const acceptInvite = (invite) => {
        const inviteId = invite.inviteId;
        const customerId = invite.customerId;
        const workspaceId = invite.workspaceId;
        const fetchAcceptInvite = async () => {
            const response = await fetch('/api/shared/acceptinvite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inviteId, customerId, workspaceId })
            });
            if (response.ok) {
                const updatedNotifications = notifications.filter(m => m.inviteId !== inviteId);
                setNotifications(updatedNotifications);
            }
        }
        fetchAcceptInvite();
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item>
                    <h3>Notifications:</h3>
                </Grid>
                <Grid item xs>
                    <Grid container direction="row-reverse">
                        <Grid item>
                            <IconButton onClick={updateNotifications}><RefreshIcon /></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>


                <Paper style={{ overflow: 'auto' }}>
                    <List>
                        {
                            notifications?.map((notification, i) =>
                                <ListItem
                                    secondaryAction={
                                        <div>
                                            <IconButton edge="end" aria-label="open" style={{ margin: 5 }}>
                                                <CheckIcon onClick={() => acceptInvite(notification)}/>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete">
                                                <ClearIcon onClick={() => deleteInvite(notification)} />
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