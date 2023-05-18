import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const SharedWorkspaces = ({ sharedWorkspaces, setSelectedWorkspace }) => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                {
                    sharedWorkspaces.length === 0 && <div>You don't have any Workspaces shared with you.</div>
                }
                {
                    sharedWorkspaces.length > 0 &&
                    <Demo>
                        <List dense={false}>
                            {sharedWorkspaces.map((workspace, index) =>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={workspace.workspaceName}
                                        secondary={workspace.dateCreated}
                                    />
                                    <Button
                                        sx={{ ml: 1 }}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<OpenInNewIcon />}
                                        onClick={async (e) => { setSelectedWorkspace(workspace) }}
                                    >
                                        Open
                                    </Button>
                                </ListItem>
                            )}
                        </List>
                    </Demo>
                }

            </Box>
        </ThemeProvider>
    )
}

export default SharedWorkspaces;