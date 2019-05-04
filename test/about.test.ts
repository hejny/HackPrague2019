import * as request from 'supertest';
import { createApp } from '../src/createApp';

const app = createApp();

export default describe('About route', () => {
    it('should get version number', () =>
        request(app)
            .get(`/about`)
            .expect(200));
});
