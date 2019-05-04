import {
    IPostItemRequest,
    IPostItemResponse,
} from './../../../interfaces/routes/item';
import { Item } from '../../model/Item';

export async function postItem(
    query: void,
    request: IPostItemRequest,
): Promise<IPostItemResponse> {
    const item = await Item.query().insert(new Item(request.item));

    return {
        status: 'created',
        item,
    };
}
