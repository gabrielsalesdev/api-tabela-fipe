const express = require('express');
const app = express();

const { errorsMiddlewares } = require('./middlewares/index');
const { fipeRoutes, vehiclesRoutes } = require('./routes/index');

app.use(express.json());
app.use(fipeRoutes);
app.use(vehiclesRoutes);
app.use(errorsMiddlewares.errorHandler);

module.exports = app;