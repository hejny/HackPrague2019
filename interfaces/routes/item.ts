export interface IItem {
    id: string;
    uuid: string;
    created: Date;
    content: {};
}

export interface IPostItemQuery {}
export interface IPostItemRequest {
    item: Partial<IItem>;
}
export interface IPostItemResponse {
    status: 'ok';
    item: IItem;
}
