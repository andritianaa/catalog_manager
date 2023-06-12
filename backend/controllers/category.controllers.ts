import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as Category from './../services/categories.services'
import { ICategory } from '../models/categories.model'

export const create = async (req: Request, res: Response) => {
    const { name, description, tags, thumbnail, afficher } = req.body

    if (name && thumbnail) {
        const category: ICategory = { name, thumbnail, description, tags, afficher }
        sendResponse(res, await Category.create(category))
    } else res.status(403).send({ message: `name and thumbnail must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    const { name, description, tags, thumbnail, afficher, ref } = req.body
    if (name && thumbnail && ref) {
        const category: ICategory = { name, thumbnail, description, tags, afficher }
        sendResponse(res, await Category.edit(category, ref))
    } else res.status(403).send({ message: `name, thumbnail and ref must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { ref } = req.body
    if (ref) {
        sendResponse(res, await Category.remove(ref))
    } else res.status(403).send({ message: `ref must be provided`, value: {} })
}
export const resort = async (req: Request, res: Response) => {
    const { ref, moveTo } = req.body
    if (ref !== undefined && moveTo !== undefined) {
        let move = parseInt(moveTo)
        sendResponse(res, await Category.resort(ref, move))
    } else res.status(403).send({ message: `ref and moveTo must be provided`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await Category.get())