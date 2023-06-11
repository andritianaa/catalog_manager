import { Response } from 'express'


export type TData = {
    message: string,
    value: any,
    code?: number
}

export enum status {
    success = 200,
    bad_request = 400,
    unauthorized = 401,
    forbidden = 403,
    not_found = 404,
    internal_server_error = 500
}

export const insufficientParameters = (res: Response) => {
    const response: TData = {
        message: 'Insufficient parameters',
        value: {},
    }
    res.status(status.bad_request).json(response)
}

export const sendResponse = (res: Response, data: TData) => res.status(data.code || 500).send(data)

export const setData = (code: number, message: string, value: any): TData => {
    const dataSeted: TData = { code, message, value }
    return dataSeted
}