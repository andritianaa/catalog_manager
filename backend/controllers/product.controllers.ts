import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as Product from '../services/product.services'
import { IProduct } from '../models/products.model'

export const create = async (req: Request, res: Response) => {
    const { category_id, name, description, tags, skus, afficher, ref, thumbnail } = req.body
    if (category_id && name && skus) {
        const product: IProduct = { thumbnail, name, category_id, description, tags, afficher, skus, ref }
        sendResponse(res, await Product.create(product))
    } else res.status(403).send({ message: `name, skus and category_id must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    const { name, description, tags, skus, afficher, ref, id, thumbnail } = req.body
    if (name && id && skus) {
        const product: IProduct = { name, description, tags, afficher, skus, ref, thumbnail }
        sendResponse(res, await Product.edit(product, id))
    } else res.status(403).send({ message: `name, skus, id and category_id must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.body
    if (id) sendResponse(res, await Product.remove(id))
    else res.status(403).send({ message: `id must be provided`, value: {} })
}

export const resort = async (req: Request, res: Response) => {
    const { id, moveTo } = req.body
    if (parseInt(moveTo) != 0) {
        if (id !== undefined && moveTo !== undefined) sendResponse(res, await Product.resort(id, parseInt(moveTo)))
        else res.status(403).send({ message: `id and moveTo must be provided`, value: {} })
    } else res.status(403).send({ message: `moveTo must be > 0`, value: {} })
}

export const get = async (req: Request, res: Response) => {
    const { category_id } = req.query
    if (category_id) sendResponse(res, await Product.get(category_id.toString()))
    else res.status(403).send({ message: `category_id must be provided`, value: {} })
}