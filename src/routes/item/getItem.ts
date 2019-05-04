import {
    IGetItemQuery,
    IGetItemResponse,
} from './../../../interfaces/routes/item';
import { Item } from '../../model/Item';

export async function getItem({
    id,
}: IGetItemQuery): Promise<IGetItemResponse> {
    const items = await Item.query()
        .where({ uuid: id })
        .select()
        .map((raw) => new Item(raw));

    if (items.length === 0) {
        return {
            status: 'not_found',
        };
    } else {
        const [item] = items;
        return {
            status: 'ok',
            item,
        };
    }
}
