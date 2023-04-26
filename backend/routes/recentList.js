const express = require('express')
const router = express.Router()

const { addToTheList, getCustomerList } = require('../controllers/recentListController');

// add to the list
router.post('/recentlist', addToTheList);

// get list 
router.get('/recentlist/:_customerId', getCustomerList);

module.exports = router;