import {
    IGetItemsQuery,
    IGetItemsResponse,
    IGetItemQuery,
    IGetItemResponse,
    IPostItemRequest,
    IPostItemResponse,
} from './../interfaces/routes/item';
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
import { getItems } from './routes/item/getItems';
import { postItem } from './routes/item/postItem';
import { getItem } from './routes/item/getItem';
import { initDBConnection } from './knex';

export function createApp(): express.Express {
    initDBConnection(); //todo better

    const app = express();

    app.use(json());
    app.use(cors());
    app.use(expressLogger());

    app.use(logMiddleware);

    app.get(
        ['/', '/about'],
        createRouteHandler<void, IGetAboutResponse>(getAbout),
    );

    app.get(
        '/items',
        createRouteHandler<IGetItemsQuery, IGetItemsResponse>(getItems),
    );
    app.get(
        '/items/:id',
        createRouteHandler<IGetItemQuery, IGetItemResponse>(getItem),
    );
    app.post(
        '/items',
        createRouteHandlerWithRequest<
            void,
            IPostItemRequest,
            IPostItemResponse
        >(postItem),
    );

    return app;
}
