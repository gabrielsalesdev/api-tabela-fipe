import { Router } from 'express';
import BrandsController from '../controllers/brands.controller';
import ModelsController from '../controllers/models.controller';
import ModelYearsController from '../controllers/model-years.controller';
import ValuesController from '../controllers/values.controller';

const motorcyclesRouter = Router();
const brandsController = new BrandsController();
const modelsController = new ModelsController();
const modelYearsController = new ModelYearsController();
const valuesController = new ValuesController();

motorcyclesRouter.get('/motos', brandsController.get(2));
motorcyclesRouter.get('/motos/:brandId', modelsController.get(2));
motorcyclesRouter.get('/motos/:brandId/:modelId', modelYearsController.get(2));
motorcyclesRouter.get('/motos/:brandId/:modelId/:modelYearId', valuesController.getTraditional(2));

export default motorcyclesRouter;