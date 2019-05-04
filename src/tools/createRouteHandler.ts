import { RequestHandler } from 'express';
import { ResponseStatus } from '../../interfaces/IResponse';

interface IResponseWithStatus {
    status: ResponseStatus;
}

export function createRouteHandlerWithRequest<
    TQuery,
    TRequest,
    TResponse extends IResponseWithStatus
>(
    handler: (query: TQuery, request: TRequest) => Promise<TResponse>,
): RequestHandler {
    return async (request, response, next) => {
        try {
            const responseData = await handler(request.params, request.body);

            if (responseData.status === 'ok') {
                response.status(200);
            } else if (responseData.status === 'created') {
                response.status(201);
            } else if (responseData.status === 'not_found') {
                response.status(404);
            } else if (responseData.status === 'error') {
                response.status(400);
            }

            response.json(responseData);
        } catch (error) {
            /*if ((error.code = 'ER_PARSE_ERROR')) {
                error.sql_purge = error.sql
                    .replace('\n', '')
                    .replace(/\s\s+/g, ' ')
                    .trim();
            }*/
            next(error);
        }
    };
}

export function createRouteHandler<
    TQuery,
    TResponse extends IResponseWithStatus
>(handler: (query: TQuery) => Promise<TResponse>): RequestHandler {
    return createRouteHandlerWithRequest<TQuery, void, TResponse>(handler);
}
