const express = require('express')
const router = express.Router()
const { createInvite,
    getCustomerInvites,
    deleteInvite,
    acceptInvite,
    getCustomerSharedWorkspaces,
    getPendingInvites,
    getAcceptedInvites } = require('../controllers/sharedWorkspacesController');

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

// get pending invites
router.get('/pendinginvites', getPendingInvites);

// get accepted invites
router.get('/acceptedinvites', getAcceptedInvites);

module.exports = router;
