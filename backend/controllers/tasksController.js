const taskModel = require('../models/taskModel');

// createTask(): create a task and return task info
// Arguments: boardId, taskName, taskInfo, taskDueDate
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const createTask = async (req, res) => {
  const { boardId, columnId, taskName, taskInfo, taskDueDate } = req.body;
  console.log(boardId);
  console.log(columnId);
  console.log(taskName);
  console.log(taskInfo);
  console.log(taskDueDate);
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
const getTask = async (req, res) => {
  const { taskId } = req.body;
  try {
      const task = await taskModel.getCustomerTask(taskId);
      res.status(200).json(Task);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

// updateTask(): Given taskId, update a task's member items.
// Arguments: taskId, boardId, taskName, taskInfo, taskDueDate 
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const updateTask = async (req, res) => {
  const { taskId, columnId, taskName, taskInfo, taskDueDate } = req.body;
  try {
      const response = await TaskModel.updateWorkspaceDetails(taskId, columnId, 
                                              taskName, taskInfo, taskDueDate);
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
  try {
      const response = await TaskModel.deleteTask(taskId);
      res.status(200).json({ response });
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

module.exports = { createTask, getTask, updateTask, deleteTask }