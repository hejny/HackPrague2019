export type ResponseStatus = 'ok' | 'created' | 'error' | 'not_found';

export interface IResponse {
    status: ResponseStatus;
}
