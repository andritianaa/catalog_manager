import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as Sku from '../services/skus.services'
import { ISku } from '../models/skus.model'
import { moneyConvertion } from '../utils/money.converter'


export const create = async (req: Request, res: Response) => {
    const { price, afficher, option_list_ids, name, ref } = req.body

    if (name && price) {
        const sku: ISku = { name, price: moneyConvertion(price), afficher, option_list_ids, ref }
        sendResponse(res, await Sku.create(sku))
    } else res.status(403).send({ message: `name and price must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    const { price, afficher, option_list_ids, name, ref, id } = req.body

    if (name && price && id) {
        const sku: ISku = { name, price: moneyConvertion(price), afficher, option_list_ids, ref }
        sendResponse(res, await Sku.edit(sku, id))
    } else res.status(403).send({ message: `name, price and id must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.body
    if (id) sendResponse(res, await Sku.remove(id))
    else res.status(403).send({ message: `id must be provided`, value: {} })
}
export const resort = async (req: Request, res: Response) => {
    const { id, moveTo } = req.body
    if (parseInt(moveTo) != 0) {
        if (id !== undefined && moveTo !== undefined) sendResponse(res, await Sku.resort(id, parseInt(moveTo)))
        else res.status(403).send({ message: `id and moveTo must be provided`, value: {} })
    } else res.status(403).send({ message: `moveTo must be > 0`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await Sku.get())