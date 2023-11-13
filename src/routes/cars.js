const express = require('express');
const carsRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

const { vehiclesMiddlewares } = require('../middlewares/index');

carsRoutes.get('/:vehicle', vehiclesMiddlewares.validateType, vehicleControllers.getBrands);
carsRoutes.get('/:vehicle/:brandId', vehiclesMiddlewares.validateType, vehicleControllers.getModels);
carsRoutes.get('/:vehicle/:brandId/:modelId', vehiclesMiddlewares.validateType, vehicleControllers.getModelYears);
carsRoutes.get('/:vehicle/:brandId/:modelId/:modelYearId', vehiclesMiddlewares.validateType, vehicleControllers.getValue);

module.exports = carsRoutes;