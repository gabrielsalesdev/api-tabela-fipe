const express = require('express');
const trucksRoutes = express();

const vehiclesControllers = require('../controllers/vehicles');

trucksRoutes.get('/caminhoes', vehiclesControllers.getBrands(3));
trucksRoutes.get('/caminhoes/:brandId', vehiclesControllers.getModels(3));
trucksRoutes.get('/caminhoes/:brandId/:modelId', vehiclesControllers.getModelYears(3));
trucksRoutes.get('/caminhoes/:brandId/:modelId/:modelYearId', vehiclesControllers.getValue(3));

module.exports = trucksRoutes;