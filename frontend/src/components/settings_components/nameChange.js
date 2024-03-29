import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdateName } from "../../hooks/useUpdateName";

// MUI
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NameChange = ({ goHome, showSettingsSuccesMessage }) => {
    const { user } = useAuthContext();
    const [firstName, setFirstName] = useState(user.user.firstName);
    const [lastName, setLastName] = useState(user.user.lastName);
    const { updateName, error, isLoading } = useUpdateName();
    const theme = createTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateName(user.user.customerId, firstName, lastName);
        goHome();
        showSettingsSuccesMessage();
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <BadgeIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Change Name:
                        </Typography>
                        <br />
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}
                                        autoFocus
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastName}
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
        </Stack>
    )
}

export default NameChange;