const express = require('express');
const motorcyclesRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

motorcyclesRoutes.get('/motos', vehiclesControllers.getBrands);
vehiclesRoutes.get('/motos/:brandId', vehiclesControllers.getModels);

module.exports = motorcyclesRoutes;