require('dotenv').config();

const express = require('express');

// Constants
const PORT = process.env.PORT

// Express
const app = express()

// Middleware
// 1. This is a logger for requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
})

// Routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to OPM API!'})
})

// Listen
app.listen(PORT,() => {
    console.log(`API is listening on ${PORT}`)
})
