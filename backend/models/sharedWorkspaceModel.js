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
    const sharedWorkspaces = await SharedWorkspaces.findAll({ where: { customerId: customerId } });
    return sharedWorkspaces;
}

exports.createInvite = createInvite;
exports.getCustomerInvites = getCustomerInvites;
exports.deleteInvite = deleteInvite;
exports.acceptInvite = acceptInvite;
exports.getCustomerSharedWorkspaces = getCustomerSharedWorkspaces;