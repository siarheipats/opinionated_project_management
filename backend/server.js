require('dotenv').config();


const express = require('express');
const mysql = require('mysql');
const app = express();

// Constants
const PORT = process.env.PORT;
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DBNAME = process.env.DB_DBNAME;

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : HOST,
    user            : USER,
    password        : PASSWORD,
    database        : DBNAME
})

// Middleware
// 1. This is a logger for requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.post('/', (req, res) => {
    query1 = 'INSERT INTO Customers(email, phoneNumber, firstName, lastName, password) VALUE ("test3@test", "3475451013", "testFName3", "testLName3", "pwd1233");'
    pool.query(query1, function(err, results, fields) {
        res.send(JSON.stringify(results));
    })
})

// Listen
app.listen(PORT,() => {
    console.log(`API is listening on ${PORT}`);
    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }
        console.log('Connected as ID ' + connection.threadId);
    })
})
