const express = require('express')
const router = express.Router()

const { addToTheList, getCustomerList, updateRecentList } = require('../controllers/recentListController');

// add to the list
router.post('/recentlist', addToTheList);

// get list 
router.get('/recentlist/:_customerId', getCustomerList);

// update recent list
router.put('/update/', updateRecentList);

module.exports = router;