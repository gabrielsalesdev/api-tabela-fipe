import { Request, Response, NextFunction } from "express";
import ModelYearsService from "../services/model-years.service";
import { ModelYear } from "../interfaces/model-year.interface";

export default class ModelYearsController {
    public get = (vehicleId: number) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { brandId, modelId } = req.params;

            const modelYearsService = new ModelYearsService(vehicleId.toString(), brandId, modelId);

            const modelYears: ModelYear[] = await modelYearsService.get();

            res.status(200).json(modelYears);
        } catch (error) {
            next(error);
        }
    };
};