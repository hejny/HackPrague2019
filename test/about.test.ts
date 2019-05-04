import * as request from 'supertest';
import { createApp } from '../src/createApp';
import { version } from '../package.json';

const app = createApp();

export default describe('About route', () => {
    it('should get version number', () =>
        request(app)
            .get(`/about`)
            .expect(200)
            .expect({ version }));
    /*.expect((res) => {
                console.log('res', res.body);
                res.body.should.include('version');
            })*/
});
