const express = require('express');
const motorcyclesRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

motorcyclesRoutes.get('/motos', vehiclesControllers.getBrands);
motorcyclesRoutes.get('/motos/:brandId', vehiclesControllers.getModels);

module.exports = motorcyclesRoutes;