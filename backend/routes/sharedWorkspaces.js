const express = require('express')
const router = express.Router()
const {createInvite, 
    getCustomerInvites, 
    deleteInvite, 
    acceptInvite, 
    getCustomerSharedWorkspaces} = require('../controllers/sharedWorkspacesController');

// create invite
router.post('/createinvite', createInvite);

// get customer invites
router.get('/getinvites', getCustomerInvites);

// delete invite
router.delete('/deleteinvite', deleteInvite);

// accept invite
router.post('/acceptinvite', acceptInvite);

// get shared workspaces
router.get('/getsharedworkspaces', getCustomerSharedWorkspaces);

module.exports = router;
