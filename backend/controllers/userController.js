const jwt = require('jsonwebtoken')

const userModel = require('../models/user');

// create token
const createToken = (customerId) => {
    return jwt.sign({customerId}, process.env.SECRET, { expiresIn: '1d'});
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.login(email, password);
        const token = createToken(user.customerId);
        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, phoneNumber, firstName, lastName, password} = req.body;
    try {
        const newUser = await userModel.signup(email, phoneNumber, firstName, lastName, password);
        const token = createToken(newUser.customerId);
        res.status(200).json({newUser, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {signupUser, loginUser}