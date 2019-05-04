import { RequestHandler, Request, Response } from 'express';
import { Log } from '../model/Log';

export const logMiddleware: RequestHandler = (req, res, next) => {
    const { write, end } = res;
    const chunks = new Array<any>();
    (res as any).write = (...args: any[]) => {
        chunks.push(Buffer.from(args[0]));
        write.apply(res, args);
    };

    (res as any).end = async (...args: any[]) => {
        const endStream = () => end.apply(res, args);
        if (shouldSkipLogging(req, res)) {
            return endStream();
        }
        if (args[0]) {
            chunks.push(Buffer.from(args[0]));
        }
        const responseBody = Buffer.concat(chunks).toString('utf8');
        const raw = new Log({
            apiKey: `${req.headers.Authorization}`,
            endpoint: req.path,
            statusCode: res.statusCode,
            request: JSON.stringify({
                headers: req.headers,
                body: req.body,
                query: req.query,
                method: req.method,
            }),
            response: JSON.stringify({
                status: res.statusCode,
                body: responseBody,
            }),
        });
        await Log.query().insert(raw);
        endStream();
    };
    next();
};

function shouldSkipLogging(req: Request, res: Response) {
    return res.statusCode === 200 && req.method === 'GET';
}
