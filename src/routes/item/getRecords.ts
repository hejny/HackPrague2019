import { Record } from '../../model/Record';
import {
    IGetRecordQuery,
    IGetRecordsResponse,
} from '../../../interfaces/routes/record';

export async function getRecords(): Promise<IGetRecordsResponse> {
    const records = await Record.query()
        .select()
        .map((raw) => new Record(raw));

    return {
        status: 'ok',
        records,
    };
}
