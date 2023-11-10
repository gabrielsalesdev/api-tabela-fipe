const express = require('express');
const router = express();

const vehicleControllers = require('../controllers/vehicles');

const { vehiclesMiddlewares } = require('../middlewares/index');

module.exports = router;