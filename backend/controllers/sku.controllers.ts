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
    const { price, afficher, option_list_ids, name, ref } = req.body

    if (name && price && ref) {
        const sku: ISku = { name, price: moneyConvertion(price), afficher, option_list_ids, ref }
        sendResponse(res, await Sku.edit(sku, ref))
    } else res.status(403).send({ message: `name, price and ref must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { ref } = req.body
    if (ref) {
        sendResponse(res, await Sku.remove(ref))
    } else res.status(403).send({ message: `ref must be provided`, value: {} })
}
export const resort = async (req: Request, res: Response) => {
    const { ref, moveTo } = req.body
    if (ref !== undefined && moveTo !== undefined) {
        let move = parseInt(moveTo)
        sendResponse(res, await Sku.resort(ref, move))
    } else res.status(403).send({ message: `ref and moveTo must be provided`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await Sku.get())