import { Request, Response, NextFunction } from "express";
import ModelsService from "../services/models.service";
import { Model } from "../interfaces/model.interface";

export default class ModelsController {
    public get = (vehicleId: number) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { brandId } = req.params;

            const modelsService = new ModelsService(vehicleId.toString(), brandId);

            const models: Model[] = await modelsService.get();

            res.status(200).json(models);
        } catch (error) {
            next(error);
        }
    };
};