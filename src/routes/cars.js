const express = require('express');
const carsRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

carsRoutes.get('/carros', vehiclesControllers.getBrands);
carsRoutes.get('/carros/:brandId', vehiclesControllers.getModels);
carsRoutes.get('/carros/:brandId/:modelId', vehiclesControllers.getModelYears);
carsRoutes.get('/carros/:brandId/:modelId/:modelYearId', vehiclesControllers.getValue);

module.exports = carsRoutes;