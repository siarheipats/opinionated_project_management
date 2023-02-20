require('dotenv').config();

const bodyparser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/user');
const workspaceRoutes = require('./routes/workspace')
const sharedWorkspacesRoutes = require('./routes/sharedWorkspaces')
const app = express();
const db = require('./db_connector')

// Constants
const PORT = process.env.PORT;

// Middleware
app.use(express.json())
app.use(bodyparser.json());
// 1. This is a logger for requests
//app.use((req, res, next) => {
//   console.log(req.path, req.method);
//    next();
//})

// Routes
// Register User Routes
app.use('/api/user', userRoutes);
// Register Workspace Routes
app.use('/api/workspace', workspaceRoutes)
// register shared workspaces Routes
app.use('/api/shared', sharedWorkspacesRoutes)

// Listen
app.listen(PORT, () => {
    console.log(`API is listening on ${PORT}`);
    db.sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
})
