import { Request, Response, NextFunction } from "express";
import ValuesService from "../services/values.service";
import { Value } from "../interfaces/value.interface";

export default class ValuesController {
    public getTradicional = (vehicleId: number) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { brandId, modelId, modelYearId } = req.params;

            const valueService = new ValuesService();

            const value: Value = await valueService.getTradicional(vehicleId.toString(), brandId, modelId, modelYearId);

            res.status(200).json(value);
        } catch (error) {
            next(error);
        }
    };

    public getByFipeAndModelYear = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { fipeCode, modelYearId } = req.params;

            const valueService = new ValuesService();

            const value: Value = await valueService.getByFipeAndModelYear(fipeCode, modelYearId);

            res.status(200).json(value);
        } catch (error) {
            next(error);
        }
    };
};