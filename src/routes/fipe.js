const express = require('express');
const router = express();

const { fipeControllers } = require('../controllers/index');

router.get('/fipe/:fipeCode', fipeControllers.getVehicleValueByFipe)

module.exports = router;