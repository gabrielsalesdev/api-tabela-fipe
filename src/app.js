const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger.json');

const errorsMiddlewares = require('./middlewares/errors');

const carsRoutes = require('./routes/cars');
const fipeRoutes = require('./routes/fipe');
const motorcyclesRoutes = require('./routes/motorcycles');
const trucksRoutes = require('./routes/trucks');

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(carsRoutes, fipeRoutes, motorcyclesRoutes, trucksRoutes);
app.use(errorsMiddlewares.errorHandler);

module.exports = app;