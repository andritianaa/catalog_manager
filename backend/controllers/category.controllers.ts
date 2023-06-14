import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as Category from './../services/categories.services'
import { ICategory } from '../models/categories.model'

export const create = async (req: Request, res: Response) => {
    const { name, description, tags, thumbnail, afficher, ref } = req.body
    if (name && thumbnail) {
        const category: ICategory = { name, thumbnail, description, tags, afficher, ref }
        sendResponse(res, await Category.create(category))
    } else res.status(403).send({ message: `name and thumbnail must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    const { name, description, tags, thumbnail, afficher, ref, id } = req.body
    if (name && thumbnail && id) {
        const category: ICategory = { name, thumbnail, description, tags, afficher, ref }
        sendResponse(res, await Category.edit(category, id))
    } else res.status(403).send({ message: `name, thumbnail and id must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.body
    if (id) {
        sendResponse(res, await Category.remove(id))
    } else res.status(403).send({ message: `id must be provided`, value: {} })
}
export const resort = async (req: Request, res: Response) => {
    const { id, moveTo } = req.body
    if (id !== undefined && moveTo !== undefined) {
        let move = parseInt(moveTo)
        sendResponse(res, await Category.resort(id, move))
    } else res.status(403).send({ message: `id and moveTo must be provided`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await Category.get())