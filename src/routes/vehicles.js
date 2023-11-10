const express = require('express');
const router = express();

const vehicleControllers = require('../controllers/vehicles');

const { vehiclesMiddlewares } = require('../middlewares/index');

router.get('/:vehicle', vehiclesMiddlewares.validateType, vehicleControllers.getBrands);

module.exports = router;