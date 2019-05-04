import { IGetAboutResponse } from '../interfaces/routes/about/IGetAboutResponse';
import { json } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { IGetAboutQuery } from './../interfaces/routes/about/IGetAboutQuery';
import { getAbout } from './routes/getAbout';
import { createGetRouteHandler } from './tools/createRouteHandler';
import { expressLogger } from './tools/logger';
import { logMiddleware } from './tools/logMiddleware';

export function createApp(): express.Express {
    const app = express();

    app.use(json());
    app.use(cors());
    app.use(expressLogger());

    app.use(logMiddleware);

    app.get(
        ['/', '/about'],
        createGetRouteHandler<IGetAboutQuery, IGetAboutResponse>(getAbout),
    );

    return app;
}
