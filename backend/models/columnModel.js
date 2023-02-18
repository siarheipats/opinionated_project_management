const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");

const Culumns = sequelize.define("Culumns", {
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
            model: 'Boards',
            key: 'boardId'
        }
    }
},
    {
        timestamps: false
    });

async function createCulumns(columnId, columnName) {
    if (!columnId || !columnName) {
        throw Error('All fields must be filled')
    }
    const board = await Boards.findOne({ where: { boardId: boardId } });
    if (!board) {
      throw Error("Invalid board ID");
    }
    const newCulumns = await Culumns.create({
        columnId: null,
        columnName: columnName,
        boardId: boardId
    })

    return newCulumns;
}

async function readCulumns() {
    const Culumns = await Culumns.findAll();
    return Culumns;
}

async function updateCulumns(columnId, columnName) {
    if (!columnId || !columnName) {
        throw Error("All fields must be filled.")
    }

    await Culumns.update({ 
        columnName: columnName,
    }, {
        where: {
            columnId: columnId
        }
    })
}

async function deleteCulumns(columnId, columnName) {
    if (!columnId || !columnName) {
        throw Error("All fields must be filled.")
    }

    // associate tasks with boards and delete tasks with boards?

    await Culumns.destroy({
        where: {
            columnId: columnId
        }
    })
}

exports.createCulumns = createCulumns;
exports.readCulumns = readCulumns;
exports.updateCulumns = updateCulumns;
exports.deleteCulumns = deleteCulumns;