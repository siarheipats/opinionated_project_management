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
    const customerId = req.params._customerId;
    try {
        const workspaces = await workspaceModel.getCustomersWorkspaces(customerId);
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateWorkspaceDetails = async (req, res) => {
    const { workspaceId, workspaceName } = req.body;
    try {
        const response = await workspaceModel.updateWorkspaceDetails(workspaceId, workspaceName);
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteWorkspace = async (req, res) => {
    const { workspaceId } = req.body;
    try {
        const response = await workspaceModel.deleteWorkspace(workspaceId);
        res.status(200).json({ response });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = { createWorkspace, getWorkspaces, updateWorkspaceDetails, deleteWorkspace }