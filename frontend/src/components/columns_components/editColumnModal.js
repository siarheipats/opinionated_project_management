import React, { useState } from "react";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditColumnModal = ({ column, showModal, handleCloseModal }) => {
    const [columnName, setColumnName] = useState("");

    const handleClose = () => {
        showModal = false;
        setColumnName("");
        handleCloseModal();
    };

    return (
        <Modal
            open={showModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Column:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="New Column Name"
                            autoFocus
                            onChange={(e) => setColumnName(e.target.value)}
                            value={columnName}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} >
                            Save
                        </Button>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    )
}

export default EditColumnModal;