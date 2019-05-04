import * as request from 'supertest';
import { createApp } from '../src/createApp';
import * as uuid from 'uuid';

const app = createApp();

export default describe('Item route', () => {
    it('not found unexisting item', async () =>
        await request(app)
            .get(`/items/thisItemDontExists`)
            .expect(404));

    it('should list some items', () =>
        request(app)
            .get(`/items`)
            .expect(200));

    it('should create new item', () =>
        request(app)
            .post(`/items`)
            .send({
                item: {
                    content: { test: 'test' },
                },
            })
            .expect(201)
            .expect((response) => response.body.status === 'ok'));

    it('Should create new item and chceck if the item exists', () =>
        request(app)
            .post(`/items`)
            .send({
                item: {
                    content: { test: 'test', salt: uuid.v4() },
                },
            })
            .then(
                async (response1) =>
                    await request(app)
                        .get(`/items/${response1.body.item.uuid}`)
                        .expect(200)
                        .expect(
                            (response2) =>
                                response2.body.item.content.salt ===
                                response1.body.item.content.salt,
                        ),
            ));
});
