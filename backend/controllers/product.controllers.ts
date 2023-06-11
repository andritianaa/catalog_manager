import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as Product from '../services/product.services'
import { IProduct } from '../models/products.model'

export const create = async (req: Request, res: Response) => {
    const { category_ref, name, description, tags, skus, afficher } = req.body
    if (category_ref && name) {
        const product: IProduct = { name, category_ref, description, tags, afficher, skus }
        sendResponse(res, await Product.create(product))
    } else res.status(403).send({ message: `name and category_ref must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    const { ref, name, description, tags, skus, afficher } = req.body
    if (name) {
        const product: IProduct = { name, description, tags, afficher, skus }
        sendResponse(res, await Product.edit(product, ref))
    } else res.status(403).send({ message: `name and category_ref must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { ref } = req.body
    if (ref) {
        sendResponse(res, await Product.remove(ref))
    } else res.status(403).send({ message: `ref must be provided`, value: {} })
}

export const resort = async (req: Request, res: Response) => {
    const { ref, moveTo } = req.body
    if (ref !== undefined && moveTo !== undefined) {
        let move = parseInt(moveTo)
        sendResponse(res, await Product.resort(ref, move))
    } else res.status(403).send({ message: `ref and moveTo must be provided`, value: {} })
}

export const get = async (req: Request, res: Response) => {
    const { category_ref } = req.body
    if (category_ref) sendResponse(res, await Product.get(category_ref))
    else res.status(403).send({ message: `category_ref must be provided`, value: {} })
}