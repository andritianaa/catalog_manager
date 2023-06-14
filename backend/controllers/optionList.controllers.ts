import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as OptionList from '../services/optionList.services'
import { IOptionList } from '../models/optionList.model'


export const create = async (req: Request, res: Response) => {
    let { name, min_selections, max_selections, tags, options, ref } = req.body

    if (name) {
        const optionlist: IOptionList = { name, min_selections, max_selections, tags, options, ref }
        sendResponse(res, await OptionList.create(optionlist))
    } else res.status(403).send({ message: `name, min_selections and max_selections must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    let { name, min_selections, max_selections, tags, options, ref, id } = req.body
    if (name && min_selections && max_selections && id) {
        min_selections = parseInt(min_selections)
        max_selections = parseInt(max_selections)
        const optionlist: IOptionList = { name, min_selections, max_selections, tags, options, ref }
        sendResponse(res, await OptionList.edit(optionlist, id))
    } else res.status(403).send({ message: `name, min_selections, max_selections and id must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.body
    if (id) sendResponse(res, await OptionList.remove(id))
    else res.status(403).send({ message: `id must be provided`, value: {} })
}

export const resort = async (req: Request, res: Response) => {
    const { id, moveTo } = req.body
    if (parseInt(moveTo) != 0) {
        if (id !== undefined && moveTo !== undefined) sendResponse(res, await OptionList.resort(id, parseInt(moveTo)))
        else res.status(403).send({ message: `id and moveTo must be provided`, value: {} })
    } else res.status(403).send({ message: `moveTo must be > 0`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await OptionList.get())