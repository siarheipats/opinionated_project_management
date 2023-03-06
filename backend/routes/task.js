const express = require('express');
const router = express.Router();
const { createTask, getTask, updateTask, deleteTask} = require('../controllers/taskController');

// create task
router.post('/create', createTask);

// get task for a column
router.get('/:taskId', getTask);

// update task details
router.post('/:taskId', updateTask);

// delete task
router.get('/:taskId', deleteTask);

module.exports = router;