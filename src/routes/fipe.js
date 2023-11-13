const express = require('express');
const fipeRoutes = express();

const { fipeControllers } = require('../controllers/index');

fipeRoutes.get('/fipe/:fipeCode', fipeControllers.getVehicleValuesByFipe);
fipeRoutes.get('/fipe/:fipeCode/:modelYearId', fipeControllers.getVehicleValueByFipeAndModelYear);

module.exports = fipeRoutes;