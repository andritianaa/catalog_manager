import { TData, setData, status } from '../utils/response'
import { ICategory } from '../models/categories.model'
import { CategoryModel } from '../models/schema/categories.schema'
import { sort } from '../utils/sort'
import { isRefExist } from '../utils/checkRef';
import { ProductModel } from '../models/schema/product.schema';

const dataI: TData = {
    message: "Data not yet processed",
    value: {}
}

export const create = async (category: ICategory): Promise<TData> => {
    let data = { ...dataI }
    category.sort = await CategoryModel.count()
    const newCategory = new CategoryModel(category)
    if (!await isRefExist(CategoryModel, category.ref, newCategory._id.toString())) {
        newCategory.save()
        data = setData(status.success, 'Category created successfully', newCategory)
    } else data = setData(status.bad_request, 'Ref already used', {})
    return data
}

export const edit = async (category: ICategory, _id: string): Promise<TData> => {
    let data = { ...dataI }
    const toEdit = await CategoryModel.findOne({ _id })
    if (toEdit) {
        toEdit.name = category.name || ''
        toEdit.ref = category.ref || ''
        toEdit.description = category.description || ''
        toEdit.tags = category.tags || []
        toEdit.thumbnail = category.thumbnail || ''
        toEdit.afficher = category.afficher || true
        if (!await isRefExist(CategoryModel, category.ref, _id)) {
            toEdit.save()
            data = setData(status.success, 'Category edited', {})
        } else data = setData(status.bad_request, 'Ref already used', {})
    } else data = setData(status.not_found, 'This category does not exist', {})
    return data
}

export const remove = async (_id: string): Promise<TData> => {
    let data = { ...dataI }
    const toDelete = await CategoryModel.findOne({ _id })
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

export const resort = async (_id: string, moveTo: number): Promise<TData> => {
    let data = { ...dataI }
    try {
        data = await sort(CategoryModel, moveTo, _id)
    } catch (error) { data = setData(status.internal_server_error, 'Cannot resort this category', {}) }
    return data
}

export const get = async (): Promise<TData> => {
    let data = { ...dataI }
    try {
        let categories = await CategoryModel.find().sort({ 'sort': -1 })
        for (let i = 0; i < categories.length; i++)
            categories[i].products = await ProductModel.find({ category_id: categories[i] })
                .sort({ 'sort': -1 })
                .populate({
                    path: 'skus',
                    options: { sort: { sort: -1 } }
                })
                .populate({
                    path: 'skus.option_list_ids',
                    options: { sort: { sort: -1 } }
                })
                .populate({
                    path: 'skus.option_list_ids.options',
                    options: { sort: { sort: -1 } }
                })
        data = setData(status.success, 'Category getted', categories)
    } catch (err) { data = setData(status.internal_server_error, 'Cannot get categories', err) }
    return data
}