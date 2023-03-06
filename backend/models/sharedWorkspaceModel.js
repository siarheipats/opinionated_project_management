const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");

const SharedWorkspaces = sequelize.define("SharedWorkspaces", {
    sharedWorkspaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    workspaceId: {
        type: DataTypes.INTEGER
    },
    customerId: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: false
    }
);

const Invites = sequelize.define("Invites", {
    inviteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    workspaceId: {
        type: DataTypes.INTEGER
    },
    customerId: {
        type: DataTypes.INTEGER
    },
    isInviteAccepted: {
        type: DataTypes.BOOLEAN
    }
},
    {
        timestamps: false
    }
);

const InviteDisplay = sequelize.define("InviteDisplay", {
    customerId: {
        type: DataTypes.INTEGER
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
})

const SharedWorkspacesModel = sequelize.define('SharedWorkspaces', {
    workspaceId: {
        type: DataTypes.INTEGER
    },
    workspaceName: {
        type: DataTypes.STRING
    },
    dateCreated: {
        type: DataTypes.STRING
    }
})

async function createInvite(customerId, workspaceId) {
    if (!workspaceId || !customerId) {
        throw Error('All fields must be filled')
    }

    const newInvite = await Invites.create({
        workspaceId: workspaceId,
        customerId: customerId,
        isInviteAccepted: 0
    });

    return newInvite;
}

async function getCustomerInvites(customerId) {
    if (!customerId) {
        throw Error('All fields must be filled')
    }

    const invites = await Invites.findAll({ where: { customerId: customerId } });

    return invites;
}

async function deleteInvite(inviteId) {
    if (!inviteId) {
        throw Error('All fields must be filled')
    }

    const result = await Invites.destroy({
        where: {
            inviteId: inviteId
        }
    });
    return result;
}

async function acceptInvite(inviteId) {
    if (!inviteId) {
        throw Error('All fields must be filled')
    }
    await Invites.update({ isInviteAccepted: 1 }, { where: { inviteId: inviteId } });
    inviteDetails = await Invites.findOne({ where: { inviteId: inviteId } });
    const sharedWorkspace = await SharedWorkspaces.create({
        workspaceId: inviteDetails.workspaceId,
        customerId: inviteDetails.customerId
    })

    return sharedWorkspace;
}

async function getCustomerSharedWorkspaces(customerId) {
    if (!customerId) {
        throw Error('All fields must be filled')
    }
    const query = `
    SELECT Workspaces.workspaceId, Workspaces.workspaceName, Workspaces.dateCreated FROM SharedWorkspaces
    JOIN Workspaces ON Workspaces.workspaceId = SharedWorkspaces.workspaceId
    WHERE SharedWorkspaces.customerId = ${customerId};
    `
    const sharedWorkspaces = await sequelize.query(query, { model: SharedWorkspaces, mapToModel: true });
    return sharedWorkspaces;
}

async function getPendingInvitesForWorkspace(workspaceId) {
    if (!workspaceId) {
        throw Error('All fields must be filled')
    }
    const query = `
    SELECT Customers.customerId, Customers.firstName, Customers.lastName, Customers.email FROM Invites 
    JOIN Customers ON Customers.customerId = Invites.customerId
    WHERE workspaceId = ${workspaceId} AND isInviteAccepted = 0;`
    const sharedWith = await sequelize.query(query, { model: InviteDisplay, mapToModel: true });
    return sharedWith;
}

async function getAcceptedInvitesForWorksapce(workspaceId) {
    if (!workspaceId) {
        throw Error('All fields must be filled')
    }
    const query = `
    SELECT Customers.customerId, Customers.firstName, Customers.lastName, Customers.email FROM Invites 
    JOIN Customers ON Customers.customerId = Invites.customerId
    WHERE workspaceId = ${workspaceId} AND isInviteAccepted = 1;`
    const sharedWith = await sequelize.query(query, { model: InviteDisplay, mapToModel: true });
    return sharedWith;
}

exports.createInvite = createInvite;
exports.getCustomerInvites = getCustomerInvites;
exports.deleteInvite = deleteInvite;
exports.acceptInvite = acceptInvite;
exports.getCustomerSharedWorkspaces = getCustomerSharedWorkspaces;
exports.getPendingInvitesForWorkspace = getPendingInvitesForWorkspace;
exports.getAcceptedInvitesForWorksapce = getAcceptedInvitesForWorksapce;