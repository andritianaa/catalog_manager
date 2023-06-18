import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as Option from '../services/options.services'
import { IOption } from '../models/options.model'
import { moneyConvertion } from '../utils/money.converter'


export const create = async (req: Request, res: Response) => {
    const { price, afficher, defaultValue, tags, name, ref } = req.body
    if (name && price != undefined) {
        const option: IOption = {
            name,
            price: moneyConvertion(price),
            default: defaultValue,
            afficher,
            tags,
            ref
        }
        sendResponse(res, await Option.create(option))
    } else res.status(403).send({ message: `name and price must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    const { price, afficher, defaultValue, tags, name, ref, id } = req.body
    if (name && price && id) {
        const option: IOption = {
            name,
            price: moneyConvertion(price),
            default: defaultValue,
            afficher,
            tags,
            ref
        }
        sendResponse(res, await Option.edit(option, id))
    } else res.status(403).send({ message: `name, price and id must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.body
    if (id) sendResponse(res, await Option.remove(id))
    else res.status(403).send({ message: `id must be provided`, value: {} })
}

export const resort = async (req: Request, res: Response) => {
    const { id, moveTo } = req.body
    if (parseInt(moveTo) != 0) {
        if (id !== undefined && moveTo !== undefined) sendResponse(res, await Option.resort(id, parseInt(moveTo)))
        else res.status(403).send({ message: `ref and moveTo must be provided`, value: {} })
    } else res.status(403).send({ message: `moveTo must be > 0`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await Option.get())