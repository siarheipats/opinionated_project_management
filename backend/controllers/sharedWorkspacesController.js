const sharedWorkspaceModel = require('../models/sharedWorkspaceModel')

const createInvite = async (req, res) => {
    const { customerId, workspaceId } = req.body;
    try {
        const invite = await sharedWorkspaceModel.createInvite(customerId, workspaceId);
        res.status(200).json(invite);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCustomerInvites = async (req, res) => {
    const { customerId } = req.body;
    try {
        const invites = await sharedWorkspaceModel.getCustomerInvites(customerId);
        res.status(200).json(invites);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteInvite = async (req, res) => {
    const { inviteId } = req.body;
    try {
        const result = await sharedWorkspaceModel.deleteInvite(inviteId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const acceptInvite = async (req, res) => {
    const { inviteId } = req.body;
    try {
        const result = await sharedWorkspaceModel.acceptInvite(inviteId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCustomerSharedWorkspaces = async (req, res) => {
    const customerId  = req.query['customerId'];
    try {
        const result = await sharedWorkspaceModel.getCustomerSharedWorkspaces(customerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getPendingInvites = async (req, res) => {
    const workspaceId = req.query['workspaceId'];
    try {
        const sharedWith = await sharedWorkspaceModel.getPendingInvitesForWorkspace(workspaceId);
        res.status(200).json(sharedWith);
    } catch {
        res.status(400).json({ error: error.message });
    }
}

const getAcceptedInvites = async (req, res) => {
    const workspaceId = req.query['workspaceId'];
    try {
        const sharedWith = await sharedWorkspaceModel.getAcceptedInvitesForWorksapce(workspaceId);
        res.status(200).json(sharedWith);
    } catch {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createInvite,
    getCustomerInvites,
    deleteInvite,
    acceptInvite,
    getCustomerSharedWorkspaces,
    getPendingInvites,
    getAcceptedInvites
}