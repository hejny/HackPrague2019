import { AbstractModel } from './AbstractModel';
import * as uuid from 'uuid';

export class Item extends AbstractModel {
    static tableName = 'Item';
    static idColumn = 'id';

    readonly id: string;
    uuid: string = uuid.v4();
    created: Date = new Date();
    content: string;

    constructor(raw: Partial<Item> = {}) {
        super();
        Object.assign(this, raw);
    }
}
