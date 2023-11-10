const express = require('express');
const app = express();

const { errorsMiddlewares } = require('./middlewares/index');

app.use(express.json());
app.use(errorsMiddlewares.errorHandler);

module.exports = app;