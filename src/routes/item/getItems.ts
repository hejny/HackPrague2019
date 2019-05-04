import { Item } from '../../model/Item';
import {
    IGetItemsQuery,
    IGetItemsResponse,
} from './../../../interfaces/routes/item';

export async function getItems(
    query: IGetItemsQuery,
): Promise<IGetItemsResponse> {
    const items = await Item.query()
        .select()
        .map((raw) => new Item(raw));

    return {
        status: 'ok',
        items,
    };
}
