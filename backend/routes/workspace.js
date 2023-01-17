const express = require('express')
const router = express.Router()
const { createWorkspace, getWorkspaces } = require('../controllers/workspaceController')

// create workspace route
router.post('/create', createWorkspace)

// get all workspaces for a user
router.get('/workspaces', getWorkspaces)

module.exports = router;
