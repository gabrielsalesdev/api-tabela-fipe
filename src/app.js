const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger.json');

const errorsMiddlewares = require('./middlewares/errors');

const { fipeRoutes, carsRoutes, motorcyclesRoutes, trucksRoutes } = require('./routes/index');

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(fipeRoutes, carsRoutes, motorcyclesRoutes, trucksRoutes);
app.use(errorsMiddlewares.errorHandler);

module.exports = app;