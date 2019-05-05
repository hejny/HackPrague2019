import {
    IGetRecordQuery,
    IGetRecordResponse,
} from '../../../interfaces/routes/record';
import { Record } from '../../model/Record';

export async function getRecord({
    id,
}: IGetRecordQuery): Promise<IGetRecordResponse> {
    const records = await Promise.all(
        (await Record.query()
            .where({ uuid: id })
            .eager('faceImage')
            .select()).map((raw) => new Record(raw).expanded()),
    );

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
