import { ErrorRequestHandler } from 'express';
import { logger } from './logger';

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
    logger.error(err);
    if (typeof err === 'string') {
        return res.status(400).json(errorResponse(err));
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(400).json(errorResponse(err.message));
    }
    return res.status(500).json(err);
};

function errorResponse(message: string) {
    return { message };
}
