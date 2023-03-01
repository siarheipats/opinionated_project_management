const express = require('express');
const router = express.Router();
const { createBoard, getBoard, updateBoard, deleteBoard } = require('../controllers/boardController');

// create board
router.post('/', createBoard);

// get board details
router.get('/:boardId', getBoard);

// update board details
router.put('/:boardId', updateBoard);

// delete board
router.delete('/:boardId', deleteBoard);

module.exports = router;