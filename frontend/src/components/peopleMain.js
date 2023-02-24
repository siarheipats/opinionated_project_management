import { React, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/// Components
import PeopleSearchModal from "../components/peopleWorkspace_components/peopleSearchModal";
import PendingAndAcceptedInvites from "../components/peopleWorkspace_components/peopleDisplayInvitesAcceptedInvitesCollapsable"

const PeopleMain = ({ workspaceId }) => {

    const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);
    const [pendingInvites, setPendingInvites] = useState([]);
    const [acceptedInvites, setAcceptedInvites] = useState([]);
    const theme = createTheme();

    useEffect(() => {
        const fetchPendingInvites = async () => {
            const response = await fetch(`/api/shared/pendinginvites/?workspaceId=${workspaceId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await response.json();
            if (response.ok) {
                setPendingInvites(json);
            }
        }

        const fetchAcceptedInvites = async () => {
            const response = await fetch(`/api/shared/acceptedinvites/?workspaceId=${workspaceId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await response.json();
            if (response.ok) {
                setAcceptedInvites(json);
            }
        }

        fetchPendingInvites();
        fetchAcceptedInvites();
    }, []);

    const handleOpenModal = () => setShowAddPeopleModal(true);
    const handleCloseModal = () => setShowAddPeopleModal(false);

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={handleOpenModal}>
                <AddIcon />
                Add People
            </Button>
            <PendingAndAcceptedInvites
                pendingInvites={pendingInvites}
                acceptedInvites={acceptedInvites} />
            <PeopleSearchModal
                showModal={showAddPeopleModal}
                handleCloseModal={handleCloseModal} />
        </ThemeProvider>
    )
}

export default PeopleMain;