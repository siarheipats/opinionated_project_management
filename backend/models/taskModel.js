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




// exports.createTask = createTask;
// exports.getTask = getTask;
// exports.updateTask = updateTask;
// exports.deleteTask = deleteTask;