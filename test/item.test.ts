import { initDBConnection } from './../src/knex';
import * as request from 'supertest';
import { createApp } from '../src/createApp';

initDBConnection();

const app = createApp();

export default describe('Item route', () => {
    it('should create new item', () =>
        request(app)
            .post(`/item`)
            .send({
                item: {
                    content: { test: 'test' },
                },
            })
            .expect(201)
            .expect({ status: 'ok', item: { content: { test: 'test' } } }));
});
