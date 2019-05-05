import {
    IGetRecordQuery,
    IGetRecordResponse,
    IGetRecordsResponse,
    IPostRecordRequest,
    IPostRecordResponse,
} from '../interfaces/routes/record';
import { IGetAboutResponse } from '../interfaces/routes/about';
import { json } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { getAbout } from './routes/about/getAbout';
import {
    createRouteHandler,
    createRouteHandlerWithRequest,
} from './tools/createRouteHandler';
import { expressLogger } from './tools/logger';
import { logMiddleware } from './tools/logMiddleware';
import { getRecords } from './routes/item/getRecords';
import { postItem } from './routes/item/postRecord';
import { getRecord } from './routes/item/getRecord';
import { initDBConnection } from './knex';

export function createApp(): express.Express {
    initDBConnection(); //todo better

    const app = express();

    app.use(json({ limit: '50mb' }));
    app.use(cors());
    app.use(expressLogger());
    app.set('json spaces', 4);

    app.use(logMiddleware);

    app.get(
        ['/', '/about'],
        createRouteHandler<void, IGetAboutResponse>(getAbout),
    );

    app.get(
        '/records',
        createRouteHandler<void, IGetRecordsResponse>(getRecords),
    );
    app.get(
        '/records/:id',
        createRouteHandler<IGetRecordQuery, IGetRecordResponse>(getRecord),
    );
    app.post(
        '/records',
        createRouteHandlerWithRequest<
            void,
            IPostRecordRequest,
            IPostRecordResponse
        >(postItem),
    );

    return app;
}
