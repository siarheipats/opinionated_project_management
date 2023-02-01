import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //const {updateName, error, isLoading} = useUpdateName();
    //const {updatePassword, errorPwd, isLoadingPwd} = useUpdatePassword();

    // const handleUpdateName = async (e) => {
    //     e.preventDefault();
    //     await updateName(user.user.customerId, firstName, lastName); 
    // }

    // const handleUpdatePassword = async (e) => {
    //     e.preventDefault();
    //     await updatePassword(user.user.customerId, oldPassword, newPassword, confirmNewPassword);
    // }

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
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="First Name"
                                                onChange={(e) => setFirstName(e.target.value)}
                                                value={user.user.firstName}
                                                autoFocus
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Last Name"
                                                onChange={(e) => setLastName(e.target.value)}
                                                value={user.user.lastName}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Email Update form
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Password Change form
                </TabPanel>
            </Box>
        </React.Fragment>
    )
}
export default Settings;