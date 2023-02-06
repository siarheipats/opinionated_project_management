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

const EditWorkspaceModal = ({ showModal, handleCloseModalFunction, workspaceToEdit }) => {
    const [workspaceName, setWorkspaceName] = useState('');

    const handleClose = () => {
        showModal = false;
        setWorkspaceName("");
        handleCloseModalFunction();
    };

    const updateWorkspaceName = async (workspaceId, workspaceName) => {
        const response = await fetch('/api/workspace/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ workspaceId, workspaceName })
        });

        if (response.ok) {
            handleClose();
        }
    }

    const handleUpdateWorkspace = async (e) => {
        e.preventDefault();
        await updateWorkspaceName(workspaceToEdit.workspaceId, workspaceName);
        handleClose();
    }

    return (
        <Modal
            open={showModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Workspace Details:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleUpdateWorkspace}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="New Workspace Name"
                            autoFocus
                            onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    )
}

export default EditWorkspaceModal;