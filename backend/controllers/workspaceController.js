const workspaceModel = require('../models/workspaceModel');

const createWorkspace = async (req, res) => {
    const { workspaceName, customerId } = req.body;
    try {
        const workspace = await workspaceModel.createWorkspace(workspaceName, customerId);
        res.status(200).json(workspace);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getWorkspaces = async (req, res) => {
    const { customerId } = req.body;
    try {
        const workspaces = await workspaceModel.getCustomersWorkspaces(customerId);
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createWorkspace, getWorkspaces }