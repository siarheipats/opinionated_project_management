const express = require('express');
const router = express.Router();
const { createColumn, getColumns, updateColumn, deleteColumn } = require('../controllers/columnController');

// create column
router.post('/', createColumn);

// get columns for a board
router.get('/:boardId', getColumns);

// update column details
router.put('/:columnId', updateColumn);

// delete column
router.delete('/:columnId', deleteColumn);

module.exports = router;