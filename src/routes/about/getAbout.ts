import {
    IGetAboutQuery,
    IGetAboutResponse,
} from '../../../interfaces/routes/about';
import { version } from '../../../package.json';

export async function getAbout(
    query: IGetAboutQuery,
): Promise<IGetAboutResponse> {
    return {
        version,
    };
}
