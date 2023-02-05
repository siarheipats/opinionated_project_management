import React from 'react';
import Workspace from '../workspace_components/workspace';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const WorkspacesList = ({ workspacesList, deleteWorkspace }) => {
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Your Workspaces:
                    </Typography>
                    <Demo>
                        <List dense={false}>
                            {workspacesList.map((workspace, index) =>
                                <Workspace workspaceDetails={workspace} deleteWorkspace={deleteWorkspace} />
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WorkspacesList;