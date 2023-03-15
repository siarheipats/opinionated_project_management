const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/tasksController');

// create task
router.post('/create', createTask);

// get task for a column
router.get('/gettasks/:_boardId', getTasks);

// update task details
router.put('/:taskId', updateTask);

// delete task
router.delete('/:taskId', deleteTask);

module.exports = router;