import { sendResponse } from '../utils/response'
import { Request, Response } from 'express'
import * as OptionList from '../services/optionList.services'
import { IOptionList } from '../models/optionList.model'


export const create = async (req: Request, res: Response) => {
    let { name, min_selections, max_selections, tags, options } = req.body

    if (name) {
        const optionlist: IOptionList = { name, min_selections, max_selections, tags, options }
        sendResponse(res, await OptionList.create(optionlist))
    } else res.status(403).send({ message: `name, min_selections and max_selections must be provided`, value: {} })
}

export const edit = async (req: Request, res: Response) => {
    let { name, min_selections, max_selections, tags, options, ref } = req.body


    if (name && min_selections && max_selections && ref) {
        min_selections = parseInt(min_selections)
        max_selections = parseInt(max_selections)
        const optionlist: IOptionList = { name, min_selections, max_selections, tags, options }
        sendResponse(res, await OptionList.edit(optionlist, ref))
    } else res.status(403).send({ message: `name, min_selections, max_selections and ref must be provided`, value: {} })
}

export const remove = async (req: Request, res: Response) => {
    const { ref } = req.body
    if (ref) {
        sendResponse(res, await OptionList.remove(ref))
    } else res.status(403).send({ message: `ref must be provided`, value: {} })
}

export const resort = async (req: Request, res: Response) => {
    const { ref, moveTo } = req.body
    if (ref !== undefined && moveTo !== undefined) {
        let move = parseInt(moveTo)
        sendResponse(res, await OptionList.resort(ref, move))
    } else res.status(403).send({ message: `ref and moveTo must be provided`, value: {} })
}

export const get = async (req: Request, res: Response) => sendResponse(res, await OptionList.get())