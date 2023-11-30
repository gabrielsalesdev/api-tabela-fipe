import { Request, Response, NextFunction } from 'express';

export default class BrandsController {
    public get = (vehicleId: number) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const response = await querysHelpers.selectBrandById(vehicleType);

            // return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
};