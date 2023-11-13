const express = require('express');
const trucksRoutes = express();

const { vehiclesControllers } = require('../controllers/index');

trucksRoutes.get('/motos', vehiclesControllers.getBrands);

module.exports = trucksRoutes;