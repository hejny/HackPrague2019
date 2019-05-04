import { IGetAboutResponse } from '../../../interfaces/routes/about';
import { version } from '../../../package.json';

export async function getAbout(): Promise<IGetAboutResponse> {
    return {
        status: 'ok',
        version,
    };
}
