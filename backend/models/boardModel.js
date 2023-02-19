const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");

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
    boardDescription: { // confirm this member exists in Boards table?
        type: DataTypes.STRING,
        allowNull: false
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Workspaces',
            key: 'workspaceId'
        }
    }
},
    {
        timestamps: false
    });

async function createBoard(boardName, boardDescription, workspaceId) {
    if (!boardName || !boardDescription || !workspaceId ) {
        throw Error('All fields must be filled')
    }
    const workspace = await Workspaces.findOne({ where: { workspaceId: workspaceId } });
    if (!workspace) {
      throw Error("Invalid workspace ID");
    }
    const newBoards = await Boards.create({
        boardId: null, // auto-increment field, set to null to let Sequelize generate a new value
        boardName: boardName,
        boardDescription : boardDescription,
        workspaceId: workspaceId
    })

    return newBoards;
}

async function readBoard() {
    const boards = await Boards.findAll();
    return boards;
}

async function updateBoard(boardId, boardName, boardDescription) {
    if (!boardId || !boardName || !boardDescription) {
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

async function deleteBoard(boardId, boardName) {
    if (!boardId || !boardName) {
        throw Error("All fields must be filled.")
    }

    // associate tasks with boards and delete tasks with boards?

    await Boards.destroy({
        where: {
            boardId: boardId
        }
    })
}

exports.createBoard = createBoard;
exports.readBoard = readBoard;
exports.updateBoard = updateBoard;
exports.deleteBoard = deleteBoard;