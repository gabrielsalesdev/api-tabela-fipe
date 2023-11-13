const express = require('express');
const vehiclesRoutes = express();

const vehicleControllers = require('../controllers/vehicles');

const { vehiclesMiddlewares } = require('../middlewares/index');

vehiclesRoutes.get('/:vehicle', vehiclesMiddlewares.validateType, vehicleControllers.getBrands);
vehiclesRoutes.get('/:vehicle/:brandId', vehiclesMiddlewares.validateType, vehicleControllers.getModels);
vehiclesRoutes.get('/:vehicle/:brandId/:modelId', vehiclesMiddlewares.validateType, vehicleControllers.getModelYears);
vehiclesRoutes.get('/:vehicle/:brandId/:modelId/:modelYearId', vehiclesMiddlewares.validateType, vehicleControllers.getValue);

module.exports = vehiclesRoutes;