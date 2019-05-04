import { AbstractModel } from './AbstractModel';

export class Raw extends AbstractModel {
    static tableName = 'ProjFeedersRaw';
    static idColumn = 'Id';

    readonly Id: string;
    Created: Date = new Date();
    Endpoint: string;
    ApiKey: string | null = null;
    Request: string;
    Response: string;

    constructor(raw: Partial<Raw> = {}) {
        super();
        Object.assign(this, raw);
    }
}
