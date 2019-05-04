import {
    IGetAboutQuery,
    IGetAboutResponse,
} from '../../../interfaces/routes/about';
import * as path from 'path';

const { version } = require(path.join(__dirname, '../../package.json'));

export async function getAbout(
    query: IGetAboutQuery,
): Promise<IGetAboutResponse> {
    return {
        version,
    };
}
