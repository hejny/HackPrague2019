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
        const matches = request.record.faceImage.match(
            /^data:.+\/(.+);base64,(.*)$/,
        )!;
        const mime = matches[1];
        const data = matches[2];

        const faceImageBuffer = new Buffer(data, 'base64');
        const faceImageHash = crypto
            .createHash('sha256')
            .update(faceImageBuffer)
            .digest('hex');

        faceImage = await File.query().insert(
            new File({
                //record: record.id,
                mime,
                hash: faceImageHash,
                content: faceImageBuffer,
            }),
        );

        ratings = {
            ...(await getFaceData(faceImage)),
            noice: {
                volume: Math.random(), //todo real
            },
            activity: {
                rating: Math.random(), //todo real
            },
            weather: {
                rating: Math.random(), //todo real
            },
            area: {
                rating: Math.random(), //todo real,
            },
            trafic: {
                rating: Math.random(), //todo real
            },
            polution: {
                rating: Math.random(), //todo real
            },
        };
    }

    //console.log(faceImage);

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
