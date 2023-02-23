const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");
const Boards = require("./boardModel");

const Columns = sequelize.define("Columns", {
    culumnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    culumnName: {
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
        columnId: null,
        columnName: columnName,
        boardId: boardId
    })

    return newColumn;
}

async function readColumns() {
    const Column = await Columns.findAll({
        where: {boardId : boardId}
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