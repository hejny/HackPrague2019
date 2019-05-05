import { File } from './../../model/File';
import { Record } from './../../model/Record';
import {
    IPostRecordRequest,
    IPostRecordResponse,
} from '../../../interfaces/routes/record';

export async function postItem(
    query: void,
    request: IPostRecordRequest,
): Promise<IPostRecordResponse> {
    const record = await Record.query().insert(
        new Record({
            owner: 0,
            recorded: new Date(request.record.recorded),
            coords_latitude: request.record.position.latitude,
            coords_longitude: request.record.position.longtude,
            geojson: {},
            ratings: {},
        }),
    );

    const faceImage = new Buffer(request.record.faceImage, 'base64');

    const file = await File.query().insert(
        new File({
            record: record.id,
            mime: 'image/jpeg',
            hash: 'todo',
            content: faceImage,
        }),
    );

    return {
        status: 'created',
        record,
    };
}
