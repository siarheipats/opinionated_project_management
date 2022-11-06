require('dotenv').config();


const Sequelize = require("sequelize");

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DBNAME = process.env.DB_DBNAME;

const sequelize = new Sequelize(
    DBNAME,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    } 
)

module.exports.sequelize = sequelize;