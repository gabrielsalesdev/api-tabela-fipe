import express from 'express';
import carsRouter from './routers/cars.router';
import motorcyclesRouter from './routers/motorcycles.router';
import trucksRouter from './routers/trucks.router';
import fipeRouter from './routers/fipe.router';
import ErrorsMiddleware from './middlewares/errors.middleware';

const app = express();
const errorsMiddleware = new ErrorsMiddleware();

app.use(express.json());
app.use(carsRouter, motorcyclesRouter, trucksRouter, fipeRouter);
app.use(errorsMiddleware.handler);

export default app;