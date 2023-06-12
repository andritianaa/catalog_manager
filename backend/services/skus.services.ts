import { TData, setData, status } from '../utils/response'
import { SkuModel } from '../models/schema/skus.schema'
import { ISku } from '../models/skus.model'
import { sort } from '../utils/sort'

const dataI: TData = {
    message: "Data not yet processed",
    value: {}
}

export const create = async (sku: ISku): Promise<TData> => {
    let data = { ...dataI }
    sku.sort = await SkuModel.count()
    const newSku = new SkuModel(sku)
    newSku.save()
    data = setData(status.success, 'Sku created successfully', newSku)
    return data
}

export const edit = async (sku: ISku, _id: string): Promise<TData> => {
    let data = { ...dataI }
    const toEdit = await SkuModel.findOne({ _id })
    if (toEdit) {
        toEdit.price = sku.price
        toEdit.name = sku.name
        toEdit.afficher = sku.afficher
        toEdit.option_list_refs = sku.option_list_refs
        toEdit.save()
        data = setData(status.success, 'Sku edited', {})
    } else data = setData(status.not_found, 'This sku does not exist', {})
    return data
}

export const remove = async (_id: string): Promise<TData> => {
    let data = { ...dataI }
    const toDelete = await SkuModel.findOne({ _id })
    if (toDelete) {
        const currentSort = toDelete.sort
        const skus = await SkuModel.find({ sort: { $gt: currentSort } })
        for (const sku of skus) {
            if (sku.sort) {
                sku.sort -= 1
                await sku.save()
            }
        }
        toDelete.delete()
        data = setData(status.success, 'Sku deleted', {})
    } else data = setData(status.not_found, 'This sku does not exist', {})
    return data
}

export const resort = async (_id: string, moveTo: number): Promise<TData> => {
    let data = { ...dataI }
    try { data = await sort(SkuModel, moveTo, _id) }
    catch (error) { data = setData(status.internal_server_error, 'Cannot resort this sku', {}) }
    return data
}

export const get = async (): Promise<TData> => {
    let data = { ...dataI }
    const skus = await SkuModel.find()
        .sort({ sort: 1 })
        .populate({
            path: 'options',
            options: { sort: { sort: 1 } }
        })
    data = setData(status.success, `Those are skus`, skus)
    return data
}