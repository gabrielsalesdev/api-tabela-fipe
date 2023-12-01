import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/custom-error.interface';
import HttpError from '../errors/http.error';

export default class ErrorsMiddleware {
    public handler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        console.error(err.message);

        if (!(err instanceof HttpError)) {
            err.message = 'Internal Server Error';
        }

        res.status(err.statusCode || 500).json({ message: err.message });
    };
};