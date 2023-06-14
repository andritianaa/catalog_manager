import { TData, setData, status } from '../utils/response'
import { ICategory } from '../models/categories.model'
import { CategoryModel } from '../models/schema/categories.schema'
import { sort } from '../utils/sort'

const dataI: TData = {
    message: "Data not yet processed",
    value: {}
}

export const create = async (category: ICategory): Promise<TData> => {
    let data = { ...dataI }
    category.sort = await CategoryModel.count()
    const newCategory = new CategoryModel(category)
    newCategory.save()
    data = setData(status.success, 'Category created successfully', newCategory)
    return data
}

export const edit = async (category: ICategory, ref: string): Promise<TData> => {
    let data = { ...dataI }
    const toEdit = await CategoryModel.findOne({ ref })
    if (toEdit) {
        toEdit.name = category.name
        toEdit.description = category?.description
        toEdit.tags = category?.tags
        toEdit.thumbnail = category.thumbnail
        toEdit.afficher = category?.afficher
        toEdit.save()
        data = setData(status.success, 'Category edited', {})
    } else data = setData(status.not_found, 'This category does not exist', {})
    return data
}

export const remove = async (ref: string): Promise<TData> => {
    let data = { ...dataI }
    const toDelete = await CategoryModel.findOne({ ref })
    if (toDelete) {
        const currentSort = toDelete.sort
        const categories = await CategoryModel.find({ sort: { $gt: currentSort } })
        for (const category of categories) {
            if (category.sort) {
                category.sort -= 1
                await category.save()
            }
        }
        toDelete.delete()
        data = setData(status.success, 'Category deleted', {})
    } else data = setData(status.not_found, 'This category does not exist', {})
    return data
}

export const resort = async (ref: string, moveTo: number): Promise<TData> => {
    let data = { ...dataI }
    try {
        data = await sort(CategoryModel, moveTo, ref)
    } catch (error) { data = setData(status.internal_server_error, 'Cannot resort this category', {}) }
    return data
}

export const get = (): Promise<TData> => {
    return new Promise((resolve) => {
        let data = { ...dataI }
        CategoryModel.aggregate([{ $sort: { 'sort': 1 } }]).exec((err, categories) => {
            if (err) data = setData(status.internal_server_error, 'Cannot get categories', err)
            else data = setData(status.success, 'Category getted', categories)
            resolve(data)
        })
    })
}