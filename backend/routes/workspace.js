const express = require('express')
const router = express.Router()
const { createWorkspace, getWorkspaces, updateWorkspaceDetails } = require('../controllers/workspaceController')

// create workspace route
router.post('/create', createWorkspace)

// get all workspaces for a user
router.get('/workspaces', getWorkspaces)

router.put('/update', updateWorkspaceDetails)

module.exports = router;
