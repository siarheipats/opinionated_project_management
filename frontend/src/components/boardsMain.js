import { React, useEffect, useState } from 'react';
import CreateBoardModal from './board_components/createBoardModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const BoardsMain = ({ workspaceId }) => {
    const [boards, setboards] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchBoards = async () => {
            const response = await fetch(`/api/boards/boards/${workspaceId}`, {
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
            {
                boards.map((board, index) => {
                    <div>
                        {board.boardId} {board.boardName}
                    </div>
                })
            }
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