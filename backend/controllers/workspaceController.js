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

module.exports = { createWorkspace }