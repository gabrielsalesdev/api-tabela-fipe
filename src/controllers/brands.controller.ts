import { Request, Response, NextFunction } from "express";
import BrandsService from "../services/brands.service";
import { Brand } from "../interfaces/brand.interface";

export default class BrandsController {
    vehicleId: number;

    constructor(vehicleId: number) {
        this.vehicleId = vehicleId;
    }

    public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const brandsService = new BrandsService(this.vehicleId);

            const brands: Brand[] = await brandsService.get();

            res.status(200).json(brands);
        } catch (error) {
            next(error);
        }
    };
};