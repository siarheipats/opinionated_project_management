import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import BoardsMain from '../boardsMain';
import PeopleMain from '../peopleMain';

const WorkspaceDetails = ({ workspace, closeWorkspace }) => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                <Grid item>
                    <h3>{workspace.workspaceName}</h3>
                </Grid>
                <Grid item xs>
                    <Grid container direction="row-reverse">
                        <Grid item>
                            <CloseIcon onClick={() => closeWorkspace()} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Boards" {...a11yProps(0)} />
                    <Tab label="People" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <BoardsMain />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <PeopleMain
                        workspaceId={workspace.workspaceId} />
                </TabPanel>
            </Box>

        </Box>
    )
}

export default WorkspaceDetails;