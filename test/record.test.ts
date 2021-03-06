import { MOCK1 } from './MOCK1';
import { FACE_IMAGE } from './FACE_IMAGE';
import * as request from 'supertest';
import { createApp } from '../src/createApp';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { NOISE_SOUND } from './NOISE_SOUND';

const app = createApp();

export default describe('Record route', () => {
    it('not found unexisting record', async () =>
        await request(app)
            .get(`/records/thisRecordDontExists`)
            .expect(404));

    it('should list some records', () =>
        request(app)
            .get(`/records`)
            .expect(200));

    /*
    it('should create new record', () =>
        request(app)
            .post(`/records`)
            .send({
                record: {
                    coordinates: {
                        latitude: 50,
                        longitude: 14,
                    },
                    faceImage: FACE_IMAGE,
                    noiseSound: NOISE_SOUND,
                    recorder: new Date().toISOString(),
                },
            })
            .expect(201)
            .expect((response) => response.body.status === 'ok'));
    /**/
    /*/
    it('Should create new record and chceck if the record exists', () =>
        request(app)
            .post(`/records`)
            .send({
                record: {
                    coordinates: {
                        latitude: 50,
                        longitude: 14,
                    },
                    faceImage: ``,
                    noiseSound: ``,
                    recorder: new Date().toISOString(),
                },
            })
            .then(
                async (response1) =>
                    await request(app)
                        .get(`/records/${response1.body.record.uuid}`)
                        .expect(200),
            ));
    /**/

    jest.setTimeout(30000);

    it('should create new record mocked from mobile', () =>
        request(app)
            .post(`/records`)
            .send(MOCK1)
            .expect(201)
            .expect((response) => response.body.status === 'ok'));
});
