import { IResponse } from './../IResponse';
export interface IItem {
    id: string;
    uuid: string;
    created: Date;
    content: {};
}

export interface IPostItemRequest {
    item: Partial<IItem>;
}
export interface IPostItemResponse extends IResponse {
    status: 'created';
    item: IItem;
}

export interface IGetItemsQuery {}
export interface IGetItemsResponse extends IResponse {
    status: 'ok';
    items: IItem[];
}

export interface IGetItemQuery {
    id: string;
}
export interface IGetItemResponse extends IResponse {
    status: 'ok' | 'not_found';
    item?: IItem;
}
