import { AbstractModel } from './AbstractModel';
import { RelationMappings, Model } from 'objection';
import * as uuid from 'uuid';
import { PUBLIC_URL } from '../config';

export class File extends AbstractModel {
    static tableName = 'File';
    static idColumn = 'id';

    readonly id: number;
    //record: number;
    mime: string;
    name: string;
    hash: string;
    content: Buffer;

    constructor(raw: Partial<File> = {}) {
        super();
        Object.assign(this, raw);
    }

    get publicUrl(): string {
        return `${PUBLIC_URL}/files/${this.hash}`;
    }

    /*
    static relationMappings: RelationMappings = {
        Record: {
            relation: Model.HasManyRelation,
            modelClass: 'Record',
            join: {
                from: 'File.record',
                to: 'Record.id',
            },
        },
    };
    */
}
