const express = require('express');
const carsRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

const { vehiclesMiddlewares } = require('../middlewares/index');

carsRoutes.get('/carros', vehiclesMiddlewares.validateType, vehicleControllers.getBrands);
carsRoutes.get('/carros/:brandId', vehiclesMiddlewares.validateType, vehicleControllers.getModels);
carsRoutes.get('/carros/:brandId/:modelId', vehiclesMiddlewares.validateType, vehicleControllers.getModelYears);
carsRoutes.get('/carros/:brandId/:modelId/:modelYearId', vehiclesMiddlewares.validateType, vehicleControllers.getValue);

module.exports = carsRoutes;