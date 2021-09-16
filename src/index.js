require('dotenv').config();
const {server: {port}} = require('./infrastructure/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const testRoutes = require('./infrastructure/rest/test-controller');
const healthRoutes = require('./infrastructure/rest/health-controller');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/test', testRoutes);
app.use('/health', healthRoutes);

const server = app.listen(port, () => console.log(`App running on http://localhost:${port}`));

module.exports = {app, server};
