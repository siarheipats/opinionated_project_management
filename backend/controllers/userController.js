const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel');

// create token
const createToken = (customerId) => {
    return jwt.sign({ customerId }, process.env.SECRET, { expiresIn: '1d' });
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.login(email, password);
        const token = createToken(user.customerId);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, phoneNumber, firstName, lastName, password } = req.body;
    try {
        const user = await userModel.signup(email, phoneNumber, firstName, lastName, password);
        const token = createToken(user.customerId);
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update name
const updateName = async (req, res) => {
    const { customerId, firstName, lastName } = req.body;
    try {
        const user = await userModel.updateName(customerId, firstName, lastName);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update password
const updatePassword = async (req, res) => {
    const { customerId, oldPassword, newPassword, confirmNewPassword } = req.body;
    try {
        const response = await userModel.updatePassword(customerId, oldPassword, newPassword, confirmNewPassword);
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// update email
const updateEmail = async (req, res) => {
    const { customerId, email } = req.body;
    try {
        const user = await userModel.updateEmail(customerId, email);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// earch by email 
const searchByEmail = async (req, res) => {
    const {email} = req.body;
    try {
        const customers = await userModel.searchCustomerByEmail(email);
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { signupUser, loginUser, updateName, updatePassword, updateEmail, searchByEmail }