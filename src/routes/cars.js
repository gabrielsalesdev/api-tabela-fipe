const express = require('express');
const carsRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

carsRoutes.get('/carros', vehicleControllers.getBrands);
carsRoutes.get('/carros/:brandId', vehicleControllers.getModels);
carsRoutes.get('/carros/:brandId/:modelId', vehicleControllers.getModelYears);
carsRoutes.get('/carros/:brandId/:modelId/:modelYearId', vehicleControllers.getValue);

module.exports = carsRoutes;