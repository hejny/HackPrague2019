import { IGetAboutQuery } from './../interfaces/routes/about/IGetAboutQuery';
import { IGetAboutResponse } from 'src/interfaces/routes/about/IGetAboutResponse';
import * as path from 'path';

const { version } = require(path.join(__dirname, '../../package.json'));

export async function getAbout(
    query: IGetAboutQuery,
    request: never,
): Promise<IGetAboutResponse> {
    return {
        version,
    };
}
