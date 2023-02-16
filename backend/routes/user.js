const express = require('express')
const router = express.Router()
const { signupUser, loginUser, updateName, updatePassword, updateEmail } = require('../controllers/userController')

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update name route
router.post('/update', updateName)

// change password
router.post('/pwdchange', updatePassword)

// change email
router.post('/emailchange', updateEmail)

module.exports = router;