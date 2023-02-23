import React, { useState, useEffect } from "react";

// MUI
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const PeopleSearchModal = ({ showModal, handleCloseModal }) => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleClose = () => {
        showModal = false;
        setSearchResults([]);
        setSearchText('');
        handleCloseModal();
    };

    function handleSearch(event) {
        setSearchText(event.target.value);
        if (searchText === "") {
            setSearchResults([]);
        }
        fetchSearchResults();
    }

    function handleInvite() {
        handleClose();
    }

    const fetchSearchResults = async () => {
        const response = await fetch(`/api/user/searchbyemail/?email=${searchText}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json();

        if (response.ok) {
            setSearchResults(json);
        }
    }

    return (
        <Modal
            open={showModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <Grid container>
                        <Grid item>
                            Search People:
                        </Grid>
                        <Grid item xs>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <CloseIcon onClick={() => handleClose()} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box>
                        <Grid container>
                            <Grid xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Search"
                                    autoFocus
                                    onChange={(e) => setSearchText(e.target.value)}
                                    size="small"
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Button variant="outlined" onClick={handleSearch}>Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Typography>
                <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                    <List>
                        {searchResults?.map((customer, i) =>
                            <ListItem
                                secondaryAction={
                                    <div>
                                        <Button variant="outlined" onClick={handleInvite}>Invite</Button>
                                    </div>
                                }>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText key={i}
                                    primary={`${customer.lastName}, ${customer.firstName}`}
                                    secondary={customer.email}
                                />
                            </ListItem>)}
                    </List>
                </Paper>
            </Box>
        </Modal>
    )
}

export default PeopleSearchModal;