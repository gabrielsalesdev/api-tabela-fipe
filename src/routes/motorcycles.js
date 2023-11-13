const express = require('express');
const motorcyclesRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

motorcyclesRoutes.get('/motos', vehiclesControllers.getBrands);
motorcyclesRoutes.get('/motos/:brandId', vehiclesControllers.getModels);
motorcyclesRoutes.get('/motos/:brandId/:modelId', vehiclesControllers.getModelYears);
motorcyclesRoutes.get('/motos/:brandId/:modelId/:modelYearId', vehiclesControllers.getValue);

module.exports = motorcyclesRoutes;