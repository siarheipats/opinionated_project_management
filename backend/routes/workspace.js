const express = require('express')
const router = express.Router()
const { createWorkspace,
    getWorkspaces,
    updateWorkspaceDetails,
    deleteWorkspace } = require('../controllers/workspaceController')

// create workspace route
router.post('/create', createWorkspace)

// get all workspaces for a user
router.get('/workspaces/:_customerId', getWorkspaces)

// update workspace details
router.put('/update', updateWorkspaceDetails)

//delete workspace
router.delete('/delete', deleteWorkspace)

module.exports = router;
