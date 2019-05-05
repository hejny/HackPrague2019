import { IRatings } from './../../../interfaces/IRatings';
import { File } from './../../model/File';
import { Record } from './../../model/Record';
import {
    IPostRecordRequest,
    IPostRecordResponse,
} from '../../../interfaces/routes/record';
import { getFaceData } from '../../tools/getFaceData';
import * as crypto from 'crypto';
import { geocodeReverse } from '../../tools/geocodeReverse';

export async function postItem(
    query: void,
    request: IPostRecordRequest,
): Promise<IPostRecordResponse> {
    let ratings: IRatings = {} as any;

    if (request.record.faceImage) {
        const faceImage = new Buffer(request.record.faceImage, 'base64');
        const faceImageHash = crypto
            .createHash('sha256')
            .update(faceImage)
            .digest('hex');

        const file = await File.query().insert(
            new File({
                //record: record.id,
                mime: 'image/jpeg',
                hash: faceImageHash,
                content: faceImage,
            }),
        );

        ratings = await getFaceData(file);
    }

    const record = await Record.query().insert(
        new Record({
            owner: 0,
            recorded: new Date(request.record.recorded),
            coords_latitude: request.record.position.latitude,
            coords_longitude: request.record.position.longitude,
            geojson: await geocodeReverse(request.record.position),
            ratings,
        }),
    );

    return {
        status: 'created',
        record,
    };
}
