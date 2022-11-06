const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db_connector");

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
    const exist = await Customers.findOne({where: {email: email} });
    if(exist) {
        throw Error('Email already in use')
    }

    // Hash Password Here
    
    const user = await Customers.create({
        email: email,
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        password: password
    })
    return user;
}

module.exports = (signup)