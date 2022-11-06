const express = require('express');

// Express
const app = express()

// Routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to OPM API!'})
})

// Listen
app.listen(4000,() => {
    console.log('API is listening on port 4000')
})
