import * as request from 'supertest';
import { createApp } from '../src/createApp';
import * as path from 'path';

const { version } = require(path.join(__dirname, '../package.json'));

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
