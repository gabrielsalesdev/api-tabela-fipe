const express = require('express');
const fipeRoutes = express();

const fipeControllers = require('../controllers/fipe');

fipeRoutes.get('/fipe/:fipeCode', fipeControllers.getVehicleValuesByFipe);
fipeRoutes.get('/fipe/:fipeCode/:modelYearId', fipeControllers.getVehicleValueByFipeAndModelYear);

module.exports = fipeRoutes;