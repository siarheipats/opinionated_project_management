import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


// Components
import NameChange from "./settings_components/nameChange";
import EmailChange from "./settings_components/emailChange";
import PasswordChange from "./settings_components/passwordChange";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Settings = () => {
    const { user } = useAuthContext();
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = createTheme();

    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Box>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <SettingsSharpIcon />
                            </Avatar>
                        </Box>
                        <Tab label="Name" {...a11yProps(1)} />
                        <Tab label="Email" {...a11yProps(2)} />
                        <Tab label="Password" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={1}>
                    <NameChange />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <EmailChange />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <PasswordChange />
                </TabPanel>
            </Box>
        </React.Fragment>
    )
}
export default Settings;