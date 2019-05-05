import { IRatings } from './../IRatings';
import { IResponse } from '../IResponse';
export interface IRecord {
    id: number;
    uuid: string;
    owner: number;
    created: Date;
    recorded: Date;
    coords_latitude: number;
    coords_longitude: number;
    geojson: {};
    ratings: IRatings;
}

export interface IPostRecordRequest {
    record: {
        position: {
            latitude: number;
            longtude: number;
        };
        faceImage: string;
        noiseSound: string;
        recorded: string;
    };
}
export interface IPostRecordResponse extends IResponse {
    status: 'created';
    record: IRecord;
}

export interface IGetRecordQuery {}
export interface IGetRecordsResponse extends IResponse {
    status: 'ok';
    records: IRecord[];
}

export interface IGetRecordQuery {
    id: string;
}
export interface IGetRecordResponse extends IResponse {
    status: 'ok' | 'not_found';
    record?: IRecord;
}
