import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdateEmail } from "../../hooks/useUpdateEmail";

// MUI
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';

const EmailChange = () => {
    const { user } = useAuthContext();
    const [oldEmail, setOldEmail] = useState(user.user.email);
    const [newEmail, setNewEmail] = useState('');
    const { updateEmail, error, isLoading } = useUpdateEmail();

    const theme = createTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateEmail(user.user.customerId, newEmail);
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
                        <EmailIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Email:
                    </Typography>
                    <br />
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Current Email Address"
                            autoFocus
                            onChange={(e) => setOldEmail(e.target.value)}
                            value={oldEmail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="New Email Address"
                            autoFocus
                            onChange={(e) => setNewEmail(e.target.value)}
                            value={newEmail}
                        />
                        {error && <div className='error'>{error}</div>}
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

export default EmailChange;