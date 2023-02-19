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
    boardId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Boards',
            key: 'boardId'
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
  
  async function getTask(taskId) {
      const Task = await Tasks.getTask(taskId);
      return Task;
  }
  
  async function updateTask(taskId) {
      // if (!columnId || !columnName) {
      //     throw Error("All fields must be filled.")
      // }
  
      // await Culumns.update({ 
      //     columnName: columnName,
      // }, {
      //     where: {
      //         columnId: columnId
      //     }
      // })
  }
  
  async function deleteTask(taskId) {
      // if (!columnId || !columnName) {
      //     throw Error("All fields must be filled.")
      // }
  
      // // associate tasks with boards and delete tasks with boards?
  
      // await Culumns.destroy({
      //     where: {
      //         columnId: columnId
      //     }
      // })
  }


exports.createTask = createTask;
exports.getTask = getTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;