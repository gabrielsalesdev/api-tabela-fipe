const express = require('express');
const trucksRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

trucksRoutes.get('/motos', vehiclesControllers.getBrands);
trucksRoutes.get('/motos/:brandId', vehiclesControllers.getModels);

module.exports = trucksRoutes;