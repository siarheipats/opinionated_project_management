const taskModel = require('../models/taskModel');

// createTask(): create a task and return task info
// Arguments: boardId, taskName, taskInfo, taskDueDate
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const createTask = async (req, res) => {
  const { boardId, columnId, taskName, taskInfo, taskDueDate } = req.body;
  try {
      const task = await taskModel.createTask(boardId, columnId, taskName, 
                                            taskInfo, taskDueDate);
      res.status(200).json(task);
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

// getTask(): given a taskID, return task info
// Arguments: taskId
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const getTasks = async (req, res) => {
  const  boardId = req.params['_boardId'];
  try {
      const task = await taskModel.getTasks(boardId);
      res.status(200).json(task);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

// updateTask(): Given taskId, update a task's member items.
// Arguments: taskId, boardId, taskName, taskInfo, taskDueDate 
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const updateTask = async (req, res) => {
  const { taskId, boardId, columnId, taskName, taskInfo, taskDueDate } = req.body;
  try {
      const response = await taskModel.updateTask(
        taskId, boardId, columnId, taskName, taskInfo, taskDueDate);
      res.status(200).json({ response });
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

// deleteTask(): Given taskId, delete the task.
// Arguments: taskId
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const deleteTask = async (req, res) => {
  const { taskId } = req.body;
  console.log('Received request body:', req.body);
  try {
      const response = await taskModel.deleteTask(taskId);
      res.status(200).json({ response });
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

module.exports = { createTask, getTasks, updateTask, deleteTask }