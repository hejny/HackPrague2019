import { File } from './File';
import { IRatings } from './../../interfaces/IRatings';
import { AbstractModel } from './AbstractModel';
import * as uuid from 'uuid';
import { RelationMappings, Model } from 'objection';

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
    faceImageId: number;
    faceImage: File;

    constructor(raw: Partial<Record> = {}) {
        super();
        if (typeof raw.geojson === 'string') {
            raw.geojson = JSON.parse(raw.geojson || ('{}' as any));
        }
        if (typeof raw.ratings === 'string') {
            raw.ratings = JSON.parse(raw.ratings || ('{}' as any));
        }
        Object.assign(this, raw);
    }

    serializeToDB() {
        this.geojson = JSON.stringify(this.geojson, null, 4);
        this.ratings = JSON.stringify(this.ratings, null, 4) as any;
    }

    countRating(): number | null {
        try {
            return this.ratings.face.emotion.happiness; //todo more complex
        } catch (e) {
            return null;
        }
    }

    get title(): string | null {
        try {
            return (this.geojson as any).features[0].properties.name; //todo more complex
        } catch (e) {
            return null;
        }
    }

    async expanded(): Promise<any> {
        const {
            uuid,
            title,
            recorded,
            coords_latitude,
            coords_longitude,
            geojson,
            ratings,
            faceImage,
        } = this;

        const rating = this.countRating();
        const coordinates = {
            latitude: coords_latitude,
            longitude: coords_longitude,
        };

        //await Record.query().where({ id: this. })

        return {
            uuid,
            title,
            recorded,
            coordinates,
            geojson,
            ratings,
            rating,
            faceImageUrl: new File(faceImage).publicUrl,
        };
    }

    async collapsed(): Promise<any> {
        const {
            uuid,
            title,
            recorded,
            coordinates,
            rating,
            //faceImageUrl,
        } = await this.expanded();
        return {
            uuid,
            title,
            recorded,
            coordinates,
            rating,
            //faceImageUrl,
        };
    }

    $beforeInsert() {
        this.serializeToDB();
    }
    $beforeUpdate() {
        this.serializeToDB();
    }

    static relationMappings: RelationMappings = {
        faceImage: {
            relation: Model.HasOneRelation,
            modelClass: 'File',
            join: {
                from: 'Record.faceImageId',
                to: 'File.id',
            },
        },
    };
}
