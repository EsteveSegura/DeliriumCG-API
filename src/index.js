require('dotenv').config();
const {server: {port}} = require('./infrastructure/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const pluginRoutes = require('./infrastructure/rest/plugins-controller');
const userRoutes = require('./infrastructure/rest/users-controller');
const healthRoutes = require('./infrastructure/rest/health-controller');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/plugins', pluginRoutes);
app.use('/health', healthRoutes);

const server = app.listen(port, () => console.log(`App running on http://localhost:${port}`));

module.exports = {app, server};

