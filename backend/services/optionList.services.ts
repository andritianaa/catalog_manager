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
    if (optionlist.min_selections && optionlist.min_selections < 0) data = setData(status.bad_request, 'min_selections must be > 0', {})
    else if (optionlist.max_selections && optionlist.max_selections < 0) data = setData(status.bad_request, 'max_selections must be > 0', {})
    else if ((optionlist.max_selections && optionlist.min_selections) && (optionlist.max_selections < optionlist.min_selections)) data = setData(status.bad_request, 'max_selections must be > min_selections', {})
    else {
        optionlist.sort = await OptionListModel.count()
        const newOptionList = new OptionListModel(optionlist)
        newOptionList.save()
        data = setData(status.success, 'OptionList created successfully', newOptionList)
    }
    return data
}

export const edit = async (optionlist: IOptionList, ref: string): Promise<TData> => {
    let data = { ...dataI }
    const toEdit = await OptionListModel.findOne({ ref })
    if (optionlist.min_selections && optionlist.min_selections < 0) data = setData(status.bad_request, 'min_selections must be > 0', {})
    else if (optionlist.max_selections && optionlist.max_selections < 0) data = setData(status.bad_request, 'max_selections must be > 0', {})
    else if ((optionlist.max_selections && optionlist.min_selections) && (optionlist.max_selections < optionlist.min_selections)) data = setData(status.bad_request, 'max_selections must be > min_selections', {})
    if (toEdit) {
        toEdit.name = optionlist.name
        toEdit.min_selections = optionlist.min_selections || 0
        toEdit.max_selections = optionlist.max_selections || Number.POSITIVE_INFINITY
        toEdit.tags = optionlist.tags
        toEdit.options = optionlist.options
        toEdit.save()
        data = setData(status.success, 'OptionList edited', {})
    } else data = setData(status.not_found, 'This optionlist does not exist', {})
    return data
}

export const remove = async (ref: string): Promise<TData> => {
    let data = { ...dataI }
    const toDelete = await OptionListModel.findOne({ ref })
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

export const resort = async (ref: string, moveTo: number): Promise<TData> => {
    let data = { ...dataI }
    try { data = await sort(OptionListModel, moveTo, ref) }
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