import { RequestHandler, Request, Response } from 'express';
import { Raw } from '../model/Raw';

export const rawLogMiddleware: RequestHandler = (req, res, next) => {
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
        const raw = new Raw({
            ApiKey: `${req.headers.Authorization}`,
            Endpoint: req.path,
            Request: JSON.stringify({
                headers: req.headers,
                body: req.body,
                query: req.query,
                method: req.method,
            }),
            Response: JSON.stringify({
                status: res.statusCode,
                body: responseBody,
            }),
        });
        await Raw.query().insert(raw);
        endStream();
    };
    next();
};

function shouldSkipLogging(req: Request, res: Response) {
    return res.statusCode !== 500 && req.method === 'GET';
}
