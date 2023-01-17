const { DataTypes } = require('sequelize');
const { sequelize } = require("../db_connector");

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
        timestapms: false
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
        timestapms: false
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
        throw Error('Something went wrong. UserId is not found!');
    }
    const query = `SELECT CustomerWorkspaces.workspaceId, Workspaces.workspaceName, Workspaces.dateCreated 
    FROM opm.CustomerWorkspaces
    JOIN Workspaces ON Workspaces.workspaceId = CustomerWorkspaces.workspaceId
    WHERE CustomerWorkspaces.customerId = ${customerId};`
    //console.log(query)
    const workspaces = await sequelize.query(query, { model: Workspaces, mapToModel: true })
    return workspaces;
}

exports.createWorkspace = createWorkspace;
exports.getCustomersWorkspaces = getCustomersWorkspaces;