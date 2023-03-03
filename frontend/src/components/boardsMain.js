import { React, useEffect, useState } from 'react';
import CreateBoardModal from './board_components/createBoardModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const BoardsMain = ({ workspaceId }) => {
    const [boards, setboards] = useState([]);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const fetchBoards = async () => {
            const response = await fetch(`/api/board/boards/${workspaceId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            if (response.ok) {
                setboards(json);
            }
        }
        fetchBoards();
    }, []);


    const addBoards = (board) => {
        boards.push(board);
        setboards(boards);
        handleCloseModal();
    }

    const theme = createTheme();

    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <Button onClick={handleOpenModal}>
                <AddIcon />
                Create Board
            </Button>
            Number of board = {boards.length}
            <Demo>
                {
                    boards.map((board, index) => {
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={board.boardName}
                                    secondary={board.dateCreated}
                                />
                            </ListItem>
                        </List>

                    })
                }
            </Demo>
            <CreateBoardModal
                workspaceId={workspaceId}
                showModal={showModal}
                handleCloseModalFunction={handleCloseModal}
                addBoards={addBoards}
            />
        </ThemeProvider>
    )
}

export default BoardsMain;