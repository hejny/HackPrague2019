import { json } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { createRouteHandler } from './tools/createRouteHandler';
import { expressLogger } from './tools/logger';
import { rawLogMiddleware } from './tools/rawLogMiddleware';
import { getAbout } from './routes/getAbout';
import { IGetAboutQuery } from './interfaces/routes/about/IGetAboutQuery';
import { IGetAboutResponse } from './interfaces/routes/about/IGetAboutResponse';

export function createApp(): express.Express {
    const app = express();

    app.use(json());
    app.use(cors());
    app.use(expressLogger());

    app.use(rawLogMiddleware);

    app.get(
        ['/', '/about'],
        createRouteHandler<IGetAboutQuery, void, IGetAboutResponse>(getAbout),
    );

    return app;
}
