import { Request, Response, NextFunction } from 'express';

export default class ValuesController {
    public get = (vehicleId: number) => async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            next(error);
        }
    };

    public getByFipe = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            next(error);
        }
    };

    public getByFipeAndModelYear = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            next(error);
        }
    };
};