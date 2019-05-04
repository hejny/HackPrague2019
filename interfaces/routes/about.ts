import { IResponse } from './../IResponse';
export interface IGetAboutResponse extends IResponse {
    status: 'ok';
    version: string;
}
