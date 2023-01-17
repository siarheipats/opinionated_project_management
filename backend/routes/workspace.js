const express = require('express')
const router = express.Router()
const { createWorkspace } = require('../controllers/workspaceController')

// create workspace route
router.post('/create', createWorkspace)

module.exports = router;
