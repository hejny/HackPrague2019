import { File } from '../../model/File';
import { RequestHandler } from 'express';

export function createFileRouteHandler(): RequestHandler {
    return async (request, response, next) => {
        try {
            const files = await File.query()
                .where({ hash: request.params.id })
                .select();

            if (files.length === 0) {
                response.status(404);
                response.send({
                    status: 'not_found',
                });
            } else {
                const [file] = files;
                response.contentType(file.mime);
                response.send(file.content);
            }
        } catch (error) {
            next(error);
        }
    };
}
