const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");
const Boards = require("./boardModel");

const Columns = sequelize.define("Columns", {
    columnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    columnName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    boardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Boards,
            key: 'boardId'
        }
    }
},
    {
        timestamps: false
    });

async function createColumns(columnName, boardId) {
    if (!columnName || !boardId) {
        throw Error('All fields must be filled')
    }
    const newColumn = await Columns.create({
        columnName: columnName,
        boardId: boardId
    })

    return newColumn;
}

async function readColumns(boardId) {
    const Column = await Columns.findAll({
        where: { boardId: boardId }
    });
    return Column;
}

async function updateColumns(columnId, columnName) {
    if (!columnId || !columnName) {
        throw Error("All fields must be filled.")
    }

    await Columns.update({
        columnName: columnName,
    }, {
        where: {
            columnId: columnId
        }
    })
}

async function deleteColumns(columnId) {
    //console.log(columnId)
    if (!columnId) {
        throw Error("All fields must be filled.")
    }

    await Columns.destroy({
        where: {
            columnId: columnId
        }
    })
}

exports.createColumns = createColumns;
exports.readColumns = readColumns;
exports.updateColumns = updateColumns;
exports.deleteColumns = deleteColumns;
exports.Columns = Columns;