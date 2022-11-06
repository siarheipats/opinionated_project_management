const signupNewUser = require('../models/user')

// login user
const loginUser = async (req, res) => {
    res.json({mssg : "login user"})
}

// signup user
const signupUser = async (req, res) => {
    const {email, phoneNumber, firstName, lastName, password} = req.body;
    try {
        const newUser = await signupNewUser(email, phoneNumber, firstName, lastName, password);
        res.status(200).json({email, newUser})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}