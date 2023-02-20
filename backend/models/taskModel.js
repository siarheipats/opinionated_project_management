const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");

const Tasks = sequelize.define("Tasks", {
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    boardDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    column: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Columns',
            key: 'columnId'
        }
    },
    taskInfo: {
        type: DataTypes.DATE,
        allowNull: true
    },
    taskDueDate: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false
    });


    async function createTask(boardId, taskName, taskInfo, taskDueDate) {
      if (!boardId || !taskName || !taskInfo) {
          throw Error('All fields must be filled')
      }
      const board = await Boards.findOne({ where: { boardId: boardId } });
      if (!board) {
        throw Error("Invalid board ID");
      }
      const Task = await Tasks.create({
          boardId: boardId,
          taskName: taskName,
          taskInfo: taskInfo,
          taskDueDate: taskDueDate
      })
  
      return Task;
  }
  
  async function getTask(columnId) {
      const Task = await Tasks.getTask(columnId);
      return Task;
  }
  
  async function updateTask(taskId, columnId, taskName, taskInfo, taskDueDate) {
       if (!taskId || !columnId || !taskName ||
           !taskInfo || !taskDueDate) {
           throw Error("All fields must be filled.")
       }
  
      await Tasks.updateTask({ 
          columnId: columnId, 
          taskName: taskName, 
          taskInfo: taskInfo, 
          taskDueDate: taskDueDate
      }, {
          where: {
              taskId: taskId
          }
      })
  }
  
  async function deleteTask(taskId) {
      if (!taskId ) {
          throw Error("All fields must be filled.")
      }
  
      await Tasks.updateDelete({ 
        where: {
            taskId: taskId
         }
       })      
  }


exports.createTask = createTask;
exports.getTask = getTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;