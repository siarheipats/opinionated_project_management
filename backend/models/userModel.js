const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db_connector");
const validator = require('validator');
const bcrypt = require('bcrypt');

const Customers = sequelize.define("Customers", {
    customerId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestapms: false
});

async function signup (email, phoneNumber, firstName, lastName, password) 
{
    // Validation
    if (!email || !phoneNumber || !firstName || !lastName || !password) {
        throw Error('All fields must be filled.')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid.')
    }

    /*
    https://www.npmjs.com/package/validator
    Check if a password is strong or not. Allows for custom requirements or scoring rules. 
    If returnScore is true, then the function returns an integer score for the password rather than a boolean.
    Default options: 
    { 
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, 
        returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, 
        pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    */
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough.')
    }


    const exist = await Customers.findOne({where: {email: email} });
    if(exist) {
        throw Error('Email is already in use.')
    }

    // bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const newUser = await Customers.create({
        email: email,
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        password: hash
    })
    const user = await Customers.findOne({where: {email: email} });
    return user;
}

// login user
async function login (email, password) {
    // Validation
    if (!email || !password) {
        throw Error('All fields must be filled.')
    }

    const user = await Customers.findOne({where: {email: email} });
    if(!user) {
        throw Error('Incorrect Email.')
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw Error('Incorrect Password.')
    }
    return user;
}

// update name
async function updateName (customerId, firstName, lastName) {
    if (!firstName || !lastName) {
        throw Error("All fields must be filled.")
    }

    const user = await Customers.update({ lastName: lastName, firstName: firstName}, {
        where: {
            customerId: customerId
        }
    })
    return user;
}

// change password
async function updatePassword(customerId, oldPassword, newPassword) {
    if (!oldPassword || !newPassword) {
        throw Error("All fields must be filled.")
    }
    if(!validator.isStrongPassword(newPassword)){
        throw Error('New password not strong enough.')
    }

    // bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    // get the user
    const user = await Customers.findOne({where: {customerId: customerId}});
    const match = await bcrypt.compare(oldPassword, user.password);
    // check if the password matched
    if(!match) {
        throw Error('Incorrect Password.')
    }
    const result = Customers.update({password: hash}, {
        where: {
            customerId: customerId
        }
    });
    return result;
}

exports.signup = signup;
exports.login = login;
exports.updateName = updateName;
exports.updatePassword = updatePassword;

