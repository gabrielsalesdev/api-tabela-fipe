import { Router } from 'express';
import ValuesController from '../controllers/values.controller';

const fipeRouter = Router();
const valuesController = new ValuesController();

fipeRouter.get('/fipe/:fipeCode', valuesController.getByFipe);
fipeRouter.get('/fipe/:fipeCode/:modelYearId', valuesController.getByFipeAndModelYear);

export default fipeRouter;