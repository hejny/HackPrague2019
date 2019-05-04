import { AbstractModel } from './AbstractModel';

export class Item extends AbstractModel {
    static tableName = 'Item';
    static idColumn = 'id';

    readonly id: string;
    created: Date = new Date();
    content: string;

    constructor(raw: Partial<Item> = {}) {
        super();
        Object.assign(this, raw);
    }
}
