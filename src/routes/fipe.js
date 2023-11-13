const express = require('express');
const fipeRoutes = express();

const { fipeControllers } = require('../controllers/index');

router.get('/fipe/:fipeCode', fipeControllers.getVehicleValuesByFipe);
router.get('/fipe/:fipeCode/:modelYearId', fipeControllers.getVehicleValueByFipeAndModelYear);

module.exports = fipeRoutes;