import { IGetAboutResponse, IGetAboutQuery } from '../interfaces/routes/about';
import { json } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { getAbout } from './routes/about/getAbout';
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
