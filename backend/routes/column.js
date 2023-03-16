const express = require('express');
const router = express.Router();
const { createColumn, getColumns, updateColumn, deleteColumn } = require('../controllers/columnController');

// create column
router.post('/create', createColumn);

// get columns for a board
router.get('/getcolumns/:_boardId', getColumns);

// update column details
router.put('/update', updateColumn);

// delete column
router.delete('/deletecolumn/', deleteColumn);

module.exports = router;