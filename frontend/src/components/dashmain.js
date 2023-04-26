import { useEffect, useState } from "react";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkspaceDetails from "./workspace_components/workspaceDetails";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";

const DashboardMain = ({ openedWorkspace, closeWorkspace, recentlyOpened, setRecentlyOpened, setSelectedWorkspace }) => {
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchRecentlyOpened = async () => {
            console.log(`/api/recentlist/recentlist/${user.user.customerId}`)
            const response = await fetch(`/api/recentlist/recentlist/${user.user.customerId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await response.json();
            if (response.ok) {
                setRecentlyOpened(json);
            }
            fetchRecentlyOpened();
        }
    }, []);

    const renderDashboard = () => {
        let myArray = recentlyOpened.recentList.split("|X|X|X|***");
        let objects = [];
        for (const x of myArray) { if (x !== "") { objects.push(JSON.parse(x)) } }
        if (!openedWorkspace) {
            return (
                <Box sx={{ display: 'flex' }}>
                    <Typography paragraph>
                        <h2>Welcome, {user.user.firstName}.</h2>
                        <br />
                        <br />
                        <h4>Recently Opened</h4>
                        <br />
                        {
                            objects.length === 0 && (<div>No Recently Opened Workspaces</div>)
                        }
                        <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                            {objects.map((workspace, index) => {
                                const card = (
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                Name: {workspace.workspaceName}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Created: {workspace.dateCreated}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => setSelectedWorkspace(workspace)}>Open</Button>
                                        </CardActions>
                                    </Card>
                                );
                                return (
                                    <Grid item xs={2} md><Card variant="outlined">{card}</Card></Grid>

                                )
                            })}
                        </Grid>
                    </Typography>
                </Box>
            )
        }
        else {
            return (
                <WorkspaceDetails workspace={openedWorkspace} closeWorkspace={closeWorkspace} />
            )
        }
    }

    return (
        <div>
            {renderDashboard()}
        </div>
    )
}

export default DashboardMain;