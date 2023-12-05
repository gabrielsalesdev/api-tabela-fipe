import express from 'express';
import BrandsController from '../controllers/brands.controller';
import ModelsController from '../controllers/models.controller';
import ModelYearsController from '../controllers/model-years.controller';
import ValuesController from '../controllers/values.controller';

const carsRouter = express();
const brandsController = new BrandsController();
const modelsController = new ModelsController();
const modelYearsController = new ModelYearsController();
const valuesController = new ValuesController();

carsRouter.get('/carros', brandsController.get(1));
carsRouter.get('/carros/:brandId', modelsController.get(1));
carsRouter.get('/carros/:brandId/:modelId', modelYearsController.get(1));
carsRouter.get('/carros/:brandId/:modelId/:modelYearId', valuesController.getTradicional(1));

export default carsRouter;