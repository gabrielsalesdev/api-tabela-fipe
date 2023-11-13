const express = require('express');
const trucksRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

trucksRoutes.get('/motos', vehiclesControllers.getBrands(3));
trucksRoutes.get('/motos/:brandId', vehiclesControllers.getModels(3));
trucksRoutes.get('/motos/:brandId/:modelId', vehiclesControllers.getModelYears(3));
trucksRoutes.get('/motos/:brandId/:modelId/:modelYearId', vehiclesControllers.getValue(3));

module.exports = trucksRoutes;