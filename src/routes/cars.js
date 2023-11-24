const express = require('express');
const carsRoutes = express();

const vehiclesControllers = require('../controllers/vehicles');

carsRoutes.get('/carros', vehiclesControllers.getBrands(1));
carsRoutes.get('/carros/:brandId', vehiclesControllers.getModels(1));
carsRoutes.get('/carros/:brandId/:modelId', vehiclesControllers.getModelYears(1));
carsRoutes.get('/carros/:brandId/:modelId/:modelYearId', vehiclesControllers.getValue(1));

module.exports = carsRoutes;