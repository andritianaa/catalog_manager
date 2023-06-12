import { TData, setData, status } from '../utils/response'
import { OptionModel } from '../models/schema/options.schema'
import { IOption } from '../models/options.model'
import { sort } from '../utils/sort'

const dataI: TData = {
    message: "Data not yet processed",
    value: {}
}

export const create = async (option: IOption): Promise<TData> => {
    let data = { ...dataI }
    option.sort = await OptionModel.count()
    const newOption = new OptionModel(option)
    newOption.save()
    data = setData(status.success, 'Option created successfully', newOption)
    return data
}

export const edit = async (option: IOption, _id: string): Promise<TData> => {
    let data = { ...dataI }
    const toEdit = await OptionModel.findOne({ _id })
    if (toEdit) {
        toEdit.name = option.name
        toEdit.price = option.price
        toEdit.default = option.default
        toEdit.tags = option.tags
        toEdit.afficher = option.afficher
        toEdit.save()
        data = setData(status.success, 'Option edited', {})
    } else data = setData(status.not_found, 'This option does not exist', {})
    return data
}

export const remove = async (_id: string): Promise<TData> => {
    let data = { ...dataI }
    const toDelete = await OptionModel.findOne({ _id })
    if (toDelete) {
        const currentSort = toDelete.sort
        const options = await OptionModel.find({ sort: { $gt: currentSort } })
        for (const option of options) {
            if (option.sort) {
                option.sort -= 1
                await option.save()
            }
        }
        toDelete.delete()
        data = setData(status.success, 'Option deleted', {})
    } else data = setData(status.not_found, 'This option does not exist', {})
    return data
}

export const resort = async (_id: string, moveTo: number): Promise<TData> => {
    let data = { ...dataI }
    try { data = await sort(OptionModel, moveTo, _id) }
    catch (error) { data = setData(status.internal_server_error, 'Cannot resort this option', {}) }
    return data
}

export const get = (): Promise<TData> => {
    return new Promise((resolve) => {
        let data = { ...dataI }
        OptionModel.aggregate([{ $sort: { 'sort': 1 } }]).exec((err, options) => {
            if (err) data = setData(status.internal_server_error, 'Cannot get options', err)
            else data = setData(status.success, 'Category getted', options)
            resolve(data)
        })
    })
}