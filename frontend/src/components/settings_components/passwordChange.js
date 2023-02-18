import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";

// MUI
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import PasswordIcon from '@mui/icons-material/Password';

const PasswordChange = () => {
    const { user } = useAuthContext();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { updatePassword, error, isLoading } = useUpdatePassword();

    const theme = createTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePassword(user.user.customerId, oldPassword, newPassword, confirmNewPassword);
    }

    return (
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
                        <PasswordIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password:
                    </Typography>
                    <br />
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Current Password"
                            type="password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="New Password"
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm New Password"
                            type="password"
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            value={confirmNewPassword}
                        />
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
    )
}

export default PasswordChange;