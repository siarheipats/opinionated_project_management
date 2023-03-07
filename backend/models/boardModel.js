const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");
const Workspaces = require("./workspaceModel");

const Boards = sequelize.define("Boards", {
    boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    boardName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    boardDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Workspaces,
            key: 'workspaceId'
        }
    }
},
    {
        timestamps: false
    });

async function createBoard(boardName, boardDescription, workspaceId) {
    if (!boardName || !workspaceId ) {
        throw Error('All fields must be filled')
    }
    const newBoard = await Boards.create({
        boardId: null, // auto-increment field, set to null to let Sequelize generate a new value
        boardName: boardName,
        boardDescription : boardDescription,
        workspaceId: workspaceId
    })

    return newBoard;
}

async function getBoard(workspaceId) {
    const board = await Boards.findAll({
        where: { workspaceId: workspaceId }
    });
    return board;
}

async function updateBoard(boardId, boardName, boardDescription) {
    if (!boardId || !boardName) {
        throw Error("All fields must be filled.")
    }

    await Boards.update({ 
        boardName: boardName,
        boardDescription : boardDescription 
    }, {
        where: {
            boardId: boardId
        }
    })
}

async function deleteBoard(boardId) {
    if (!boardId) {
        throw Error("All fields must be filled.")
    }

    await Boards.destroy({
        where: {
            boardId: boardId
        }
    })
}

exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.updateBoard = updateBoard;
exports.deleteBoard = deleteBoard;
exports.Boards = Boards;