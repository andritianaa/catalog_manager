import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as Option from '../services/options.services'
import { IOption } from '../models/options.model'
import { moneyConvertion } from '../utils/money.converter'


export const create = async (req: Request, res: Response) => {
    const { price, afficher, defaultValue, tags, name } = req.body
    if (name && price) {
        const option: IOption = {
            name,
            price: moneyConvertion(price),
            default: defaultValue,
            afficher,
            tags
        }
        sendResponse(res, await Option.create(option))
    } else res.status(403).send({ message: `name and price must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    const { price, afficher, defaultValue, tags, name, ref } = req.body
    if (name && price && ref) {
        const option: IOption = {
            name,
            price: moneyConvertion(price),
            default: defaultValue,
            afficher,
            tags
        }
        sendResponse(res, await Option.edit(option, ref))
    } else res.status(403).send({ message: `name, price and ref must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { ref } = req.body
    if (ref) {
        sendResponse(res, await Option.remove(ref))
    } else res.status(403).send({ message: `ref must be provided`, value: {} })
}
export const resort = async (req: Request, res: Response) => {
    const { ref, moveTo } = req.body
    if (ref !== undefined && moveTo !== undefined) {
        let move = parseInt(moveTo)
        sendResponse(res, await Option.resort(ref, move))
    } else res.status(403).send({ message: `ref and moveTo must be provided`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await Option.get())