import { Record } from '../../model/Record';
import {
    IGetRecordQuery,
    IGetRecordsResponse,
} from '../../../interfaces/routes/record';

export async function getRecords(): Promise<IGetRecordsResponse> {
    const records = await Promise.all(
        (await Record.query()
            //.eager('faceImage')
            .orderBy('id', 'desc')
            .limit(10)
            .select()).map((raw) => new Record(raw).collapsed()),
    );

    return {
        status: 'ok',
        records,
    };
}
