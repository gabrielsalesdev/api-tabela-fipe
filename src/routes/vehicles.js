const express = require('express');
const router = express();

const vehicleControllers = require('../controllers/vehicles');

const { vehiclesMiddlewares } = require('../middlewares/index');

router.get('/:vehicle', vehiclesMiddlewares.validateType, vehicleControllers.getBrands);
router.get('/:vehicle/:brandId', vehiclesMiddlewares.validateType, vehicleControllers.getModels);
router.get('/:vehicle/:brandId/:modelId', vehiclesMiddlewares.validateType, vehicleControllers.getModelYears);

module.exports = router;