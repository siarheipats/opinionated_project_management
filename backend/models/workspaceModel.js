const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");

const BoardModel = require("./boardModel")

const Workspaces = sequelize.define("Workspaces", {
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    workspaceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCreated: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false
    });

const CustomerWorkspaces = sequelize.define("CustomerWorkspaces", {
    CustomerWorkspacesId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.INTEGER
    },
    workspaceId: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: false
    });

async function createWorkspace(workspaceName, customerId) {
    if (!workspaceName || !customerId) {
        throw Error('All fields must be filled')
    }

    const newWorkspace = await Workspaces.create({
        workspaceName: workspaceName,
        dateCreated: new Date().toLocaleString()

    })
    const associateWorkspaceWithUser = await CustomerWorkspaces.create({
        customerId: customerId,
        workspaceId: newWorkspace['dataValues'].workspaceId
    })

    return newWorkspace;
}

async function getCustomersWorkspaces(customerId) {
    if (!customerId) {
        throw Error('Something went wrong. customerId is not found!');
    }
    const query = `SELECT CustomerWorkspaces.workspaceId, Workspaces.workspaceName, Workspaces.dateCreated 
    FROM CustomerWorkspaces
    JOIN Workspaces ON Workspaces.workspaceId = CustomerWorkspaces.workspaceId
    WHERE CustomerWorkspaces.customerId = ${customerId};`
    //console.log(query)
    const workspaces = await sequelize.query(query, { model: Workspaces, mapToModel: true })
    return workspaces;
}

async function updateWorkspaceDetails(workspaceId, workspaceName) {
    if (!workspaceId || !workspaceName) {
        throw Error("All fields must be filled.")
    }

    await Workspaces.update({ workspaceName: workspaceName }, {
        where: {
            workspaceId: workspaceId
        }
    })

    BoardModel.deleteBoard
}

async function deleteWorkspace(workspaceId) {
    if (!workspaceId) {
        throw Error("All fields must be filled.")
    }
    console.log(workspaceId)

    query = `SET FOREIGN_KEY_CHECKS = 0`
    await sequelize.query(query);

    await CustomerWorkspaces.destroy({
        where: {
            workspaceId: workspaceId
        }
    });
    await Workspaces.destroy({
        where: {
            workspaceId: workspaceId
        }
    })
}

exports.createWorkspace = createWorkspace;
exports.getCustomersWorkspaces = getCustomersWorkspaces;
exports.updateWorkspaceDetails = updateWorkspaceDetails;
exports.deleteWorkspace = deleteWorkspace;