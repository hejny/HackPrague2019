import {
    IGetRecordQuery,
    IGetRecordResponse,
} from '../../../interfaces/routes/record';
import { Record } from '../../model/Record';

export async function getRecord({
    id,
}: IGetRecordQuery): Promise<IGetRecordResponse> {
    const records = await Record.query()
        .where({ uuid: id })
        .select()
        .map((raw) => new Record(raw));

    if (records.length === 0) {
        return {
            status: 'not_found',
        };
    } else {
        const [record] = records;
        return {
            status: 'ok',
            record,
        };
    }
}
