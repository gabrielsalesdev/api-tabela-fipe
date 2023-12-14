import { Request, Response, NextFunction } from "express";
import ValuesService from "../services/values.service";
import { Value } from "../interfaces/value.interface";

export default class ValuesController {
    public getTraditional = (vehicleId: number) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { brandId, modelId, modelYearId } = req.params;

            const valueService = new ValuesService();
            const value: Value = await valueService.getTraditional(vehicleId.toString(), brandId, modelId, modelYearId);

            res.status(200).json(value);
        } catch (error) {
            next(error);
        }
    };

    public getByFipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { fipeCode } = req.params;

            const valueService = new ValuesService();
            const values: Value[] = await valueService.getByFipe(fipeCode);

            res.status(200).json(values);
        } catch (error) {
            next(error);
        }
    }

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