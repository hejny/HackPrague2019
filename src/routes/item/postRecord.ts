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

    let faceImage: File | undefined = undefined;

    if (request.record.faceImage) {
        const faceImageBuffer = new Buffer(request.record.faceImage, 'base64');
        const faceImageHash = crypto
            .createHash('sha256')
            .update(faceImageBuffer)
            .digest('hex');

        faceImage = await File.query().insert(
            new File({
                //record: record.id,
                mime: 'image/jpeg',
                hash: faceImageHash,
                content: faceImageBuffer,
            }),
        );

        ratings = await getFaceData(faceImage);
    }

    console.log(faceImage);

    const record = await Record.query().insert(
        new Record({
            owner: 0,
            recorded: new Date(request.record.recorded),
            coords_latitude: request.record.coordinates.latitude,
            coords_longitude: request.record.coordinates.longitude,
            geojson: await geocodeReverse(request.record.coordinates),
            ratings,
            faceImageId: faceImage && faceImage.id, //todo better
        }),
    );

    return {
        status: 'created',
        record: await new Record(record).expanded(),
    };
}
