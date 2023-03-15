import { React, useEffect, useState } from 'react';
import CreateBoardModal from './board_components/createBoardModal';
import UpdateBoardModal from './board_components/updateBoardModal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EditIcon from '@mui/icons-material/Edit';
import BoardsDetails from './board_components/boardDetails';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const BoardsMain = ({ workspaceId }) => {
    const [boards, setBoards] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState({
        boardId: -1,
        workspaceId: -1,
        boardName: "",
        boardDescription: ""
    });
    const [columns, setColumns] = useState([{
        columnId: -1,
        columnName: '',
        boardId: -1
    }]);
    const [columnsWIthTasks, setColumnsWithTasks] = useState([{
        columnId: null,
        columnName: null,
        boardId: null,
        tasks: null
    }]);
    const [tasks, setTasks] = useState([{
        taskId: -1,
        boardId: -1,
        columnId: -1,
        taskName: "",
        taskInfo: "",
        taskDueDate: ""
    }]);

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
    }, [workspaceId]);

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
        handleCloseCreateModal();
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

    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    }
    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    }

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    }

    const handleCloseUpdateModal = () => {
        console.log("Closing update modal");
        setShowUpdateModal(false);
    }

    async function openBoard(board) {
        await fetchColumns(board);
        await fetchTasks(board);
        await assignTasksToColumns();
        setSelectedBoard(board);
        setIsDrawerOpen(true);
    }

    const assignTasksToColumns = async () => {
        for (let i = 0; i < columns.length; i++) {
            columns[i].tasks = [];
            for (let j = 0; j < tasks.length; j++) {
                if (columns[i].columnId === tasks[j].columnId) {
                    columns[i].tasks.push(tasks[j])
                }
            }
        }
        setColumnsWithTasks(columns);
    }

    const fetchColumns = async (board) => {
        const response = await fetch(`/api/column/getcolumns/${board.boardId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json();
        if (response.ok) {
            setColumns(json);
        }
    }

    const fetchTasks = async (board) => {
        const response = await fetch(`/api/task/gettasks/${board.boardId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json();
        if (response.ok) {
            setTasks(json);
        }
    }

    const handleUpdateBoardName = async (boardId, boardName) => {
        const response = await fetch('/api/board/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boardId, boardName })
        });
        if (response.ok) {
            updateBoards();
            handleCloseUpdateModal();
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={handleOpenCreateModal}>
                <AddIcon />
                Create Board
            </Button>
            <Demo>
                {boards.map((board, index) => {
                    return (
                        <List key={index}>
                            <ListItem>

                                <ListItemText
                                    primary={board.boardName}
                                    secondary={board.dateCreated}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<FolderOpenIcon />}
                                    onClick={async (e) => { await openBoard(board); }}
                                >
                                    Open
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<EditIcon />}
                                    onClick={() => {
                                        setSelectedBoard(board);
                                        handleOpenUpdateModal();
                                    }}
                                >
                                    Update
                                </Button>
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
                showModal={showCreateModal}
                handleCloseModalFunction={handleCloseCreateModal}
                addBoards={addBoards}
            />
            <UpdateBoardModal
                board={selectedBoard}
                showModal={showUpdateModal}
                handleCloseModalFunction={handleCloseUpdateModal}
                handleUpdateBoardName={handleUpdateBoardName}
            />
            <BoardsDetails board={selectedBoard} columns={columnsWIthTasks} setColumns={setColumnsWithTasks} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        </ThemeProvider>
    )
}

export default BoardsMain;