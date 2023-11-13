const express = require('express');
const motorcyclesRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

module.exports = motorcyclesRoutes;