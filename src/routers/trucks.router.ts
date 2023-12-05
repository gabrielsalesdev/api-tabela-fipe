import { Router } from 'express';
import BrandsController from '../controllers/brands.controller';
import ModelsController from '../controllers/models.controller';
import ModelYearsController from '../controllers/model-years.controller';
import ValuesController from '../controllers/values.controller';

const trucksRouter = Router();
const brandsController = new BrandsController();
const modelsController = new ModelsController();
const modelYearsController = new ModelYearsController();
const valuesController = new ValuesController();

trucksRouter.get('/caminhoes', brandsController.get(3));
trucksRouter.get('/caminhoes/:brandId', modelsController.get(3));
trucksRouter.get('/caminhoes/:brandId/:modelId', modelYearsController.get(3));
trucksRouter.get('/caminhoes/:brandId/:modelId/:modelYearId', valuesController.getTradicional(3));

export default trucksRouter;