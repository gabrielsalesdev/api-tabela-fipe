const express = require('express');
const motorcyclesRoutes = express();

const vehiclesControllers = require('../controllers/vehicles');

motorcyclesRoutes.get('/motos', vehiclesControllers.getBrands(2));
motorcyclesRoutes.get('/motos/:brandId', vehiclesControllers.getModels(2));
motorcyclesRoutes.get('/motos/:brandId/:modelId', vehiclesControllers.getModelYears(2));
motorcyclesRoutes.get('/motos/:brandId/:modelId/:modelYearId', vehiclesControllers.getValue(2));

module.exports = motorcyclesRoutes;