const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");

const Tasks = sequelize.define("Tasks", {
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    boardId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    columnId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Columns',
            key: 'columnId'
        }
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskInfo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    taskDueDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    {
        timestamps: false
    });


async function createTask(boardId, columnId, taskName, taskInfo, taskDueDate) {
    if (!boardId || !columnId || !taskName || !taskInfo || !taskDueDate) {
        throw Error('All fields must be filled')
    }
    const Task = await Tasks.create({
        boardId: boardId,
        columnId: columnId,
        taskName: taskName,
        taskInfo: taskInfo,
        taskDueDate: taskDueDate
    })

    return Task;
}

async function getTasks(boardId) {
    const tasks = await Tasks.findAll({ where: { boardId: boardId } });
    return tasks;
}

async function updateTask(taskId, boardId, columnId, taskName, taskInfo, taskDueDate) {
    if (!taskId || !boardId || !columnId || !taskName) {
        throw Error("All fields must be filled.")
    }

    await Tasks.update({
        boardId: boardId,
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
    if (!taskId) {
        throw Error("All fields must be filled.")
    }

    await Tasks.destroy({
        where: {
            taskId: taskId
        }
    })
}


exports.createTask = createTask;
exports.getTasks = getTasks;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;