import { RequestHandler } from 'express';

export function createRouteHandler<TQuery, TRequest, TResponse>(
    handler: (query: TQuery, request: TRequest) => Promise<TResponse>,
): RequestHandler {
    return async (request, response, next) => {
        try {
            const responseData = await handler(request.query, request.body);
            response.json(responseData);
        } catch (error) {
            if ((error.code = 'ER_PARSE_ERROR')) {
                error.sql_purge = error.sql
                    .replace('\n', '')
                    .replace(/\s\s+/g, ' ')
                    .trim();
            }
            next(error);
        }
    };
}
