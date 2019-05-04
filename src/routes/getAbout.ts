import { IGetAboutQuery } from '../../interfaces/routes/about/IGetAboutQuery';
import { IGetAboutResponse } from '../../interfaces/routes/about/IGetAboutResponse';
import * as path from 'path';

const { version } = require(path.join(__dirname, '../../package.json'));

export async function getAbout(
    query: IGetAboutQuery,
): Promise<IGetAboutResponse> {
    return {
        version,
    };
}
