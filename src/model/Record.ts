import { IRatings } from './../../interfaces/IRatings';
import { AbstractModel } from './AbstractModel';
import * as uuid from 'uuid';

export class Record extends AbstractModel {
    static tableName = 'Record';
    static idColumn = 'id';

    readonly id: number;
    uuid: string = uuid.v4();
    owner: number;
    created: Date = new Date();
    recorded: Date = new Date();
    coords_latitude: number;
    coords_longitude: number;
    geojson: {};
    ratings: IRatings;

    constructor(raw: Partial<Record> = {}) {
        super();
        if (typeof raw.geojson === 'string') {
            raw.geojson = JSON.parse(raw.geojson as any);
        }
        if (typeof raw.ratings === 'string') {
            raw.ratings = JSON.parse(raw.ratings as any);
        }
        Object.assign(this, raw);
    }

    $beforeInsert() {
        this.geojson = JSON.stringify(this.geojson, null, 4);
        this.ratings = JSON.stringify(this.ratings, null, 4);
    }
}
