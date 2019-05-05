import { AbstractModel } from './AbstractModel';

export class Log extends AbstractModel {
    static tableName = 'Log';
    static idColumn = 'id';

    readonly id: number;
    created: Date = new Date();
    endpoint: string;
    apiKey: string | null = null;
    statusCode: number;
    request: string;
    response: string;

    constructor(raw: Partial<Log> = {}) {
        super();
        Object.assign(this, raw);
    }
}
