import { AbstractModel } from './AbstractModel';
import * as uuid from 'uuid';

export class Item extends AbstractModel {
    static tableName = 'Item';
    static idColumn = 'id';

    readonly id: string;
    uuid: string = uuid.v4();
    created: Date = new Date();
    content: {};

    constructor(raw: Partial<Item> = {}) {
        super();
        if (typeof raw.content === 'string') {
            raw.content = JSON.parse(raw.content as any);
        }
        Object.assign(this, raw);
    }

    $beforeInsert() {
        this.content = JSON.stringify(this.content, null, 4);
    }
}
