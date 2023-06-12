import { TData, setData, status } from '../utils/response'
import { OptionListModel } from '../models/schema/optionList.schema'
import { IOptionList } from '../models/optionList.model'
import { sort } from '../utils/sort'

const dataI: TData = {
    message: "Data not yet processed",
    value: {}
}

export const create = async (optionlist: IOptionList): Promise<TData> => {
    let data = { ...dataI }
    optionlist.sort = await OptionListModel.count()
    const newOptionList = new OptionListModel(optionlist)
    newOptionList.save()
    data = setData(status.success, 'OptionList created successfully', newOptionList)
    return data
}

export const edit = async (optionlist: IOptionList, _id: string): Promise<TData> => {
    let data = { ...dataI }
    const toEdit = await OptionListModel.findOne({ _id })
    if (toEdit) {
        toEdit.name = optionlist.name
        toEdit.min_selections = optionlist.min_selections
        toEdit.max_selections = optionlist.max_selections
        toEdit.tags = optionlist.tags
        toEdit.options = optionlist.options
        toEdit.save()
        data = setData(status.success, 'OptionList edited', {})
    } else data = setData(status.not_found, 'This optionlist does not exist', {})
    return data
}

export const remove = async (_id: string): Promise<TData> => {
    let data = { ...dataI }
    const toDelete = await OptionListModel.findOne({ _id })
    if (toDelete) {
        const currentSort = toDelete.sort
        const optionlists = await OptionListModel.find({ sort: { $gt: currentSort } })
        for (const optionlist of optionlists) {
            if (optionlist.sort) {
                optionlist.sort -= 1
                await optionlist.save()
            }
        }
        toDelete.delete()
        data = setData(status.success, 'OptionList deleted', {})
    } else data = setData(status.not_found, 'This optionlist does not exist', {})
    return data
}

export const resort = async (_id: string, moveTo: number): Promise<TData> => {
    let data = { ...dataI }
    try { data = await sort(OptionListModel, moveTo, _id) }
    catch (error) { data = setData(status.internal_server_error, 'Cannot resort this optionlist', {}) }
    return data
}

export const get = async (): Promise<TData> => {
    let data = { ...dataI }
    try {
        const optionLists = await OptionListModel.find()
            .sort({ sort: 1 })
            .populate({
                path: 'options',
                options: { sort: { sort: 1 } }
            })
        data = setData(status.success, 'OptionList getted', optionLists)
    } catch (err) { data = setData(status.internal_server_error, 'Cannot get optionlists', err) }
    return data
}