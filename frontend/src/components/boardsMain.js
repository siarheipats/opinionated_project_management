import { React, useEffect, useState } from 'react';
import CreateBoardModal from './board_components/createBoardModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const BoardsMain = ({ workspaceId }) => {
    const [boards, setBoards] = useState([]);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const fetchBoards = async () => {
            const response = await fetch(`/api/board/boards/${workspaceId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            //console.log(json);
            if (response.ok) {
                setBoards(json);
            }
        }
        fetchBoards();
    }, []);

    const updateBoards = () => {
        const fetchBoards = async () => {
            const response = await fetch(`/api/board/boards/${workspaceId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json();
            if (response.ok) {
                setBoards(json);
            }
        }
        fetchBoards();
    }
    const addBoards = (board) => {
        boards.push(board);
        setBoards(boards);
        handleCloseModal();
    }

    const deleteBoards = async (boardId) => {
        const response = await fetch('/api/board/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boardId })
        });
        if (response.ok) {
            const newBoards = boards.filter(m => m.boardId !== boardId)
            setBoards(newBoards);
        }
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
                {boards.map((board, index) => {
                    return (
                        <List key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={board.boardName}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => deleteBoards(board.boardId)}
                                >
                                    Delete
                                </Button>
                            </ListItem>
                        </List>
                    );
                })}
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