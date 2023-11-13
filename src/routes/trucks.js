const express = require('express');
const trucksRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

module.exports = trucksRoutes;