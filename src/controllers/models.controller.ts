import { Request, Response, NextFunction } from 'express';

export default class ModelsController {
    public get = (vehicleId: number) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Código

        } catch (error) {
            next(error);
        }
    }
};