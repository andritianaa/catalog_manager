import { TData, setData, status } from '../utils/response'
import { IProduct } from '../models/products.model'
import { ProductModel } from '../models/schema/product.schema'

const dataI: TData = {
    message: "Data not yet processed",
    value: {}
}

export const create = async (product: IProduct): Promise<TData> => {
    let data = { ...dataI }
    product.sort = await ProductModel.count({ category_id: product.category_id })
    const newCategory = new ProductModel(product)
    newCategory.save()
    data = setData(status.success, 'Product created successfully', newCategory)
    return data
}

export const edit = async (product: IProduct, ref: string): Promise<TData> => {
    let data = { ...dataI }
    const toEdit = await ProductModel.findOne({ ref })
    if (toEdit) {
        toEdit.category_id = product.category_id
        toEdit.name = product.name
        toEdit.description = product.description
        toEdit.tags = product.tags
        toEdit.skus = product.skus
        toEdit.afficher = product.afficher
        toEdit.save()
        data = setData(status.success, 'Product edited', {})
    } else data = setData(status.not_found, 'This product does not exist', {})
    return data
}

export const remove = async (ref: string): Promise<TData> => {
    let data = { ...dataI }
    const toDelete = await ProductModel.findOne({ ref })
    if (toDelete) {
        const currentSort = toDelete.sort
        const products = await ProductModel.find({ sort: { $gt: currentSort }, category_id: toDelete.category_id })
        for (const product of products) {
            if (product.sort) {
                product.sort -= 1
                await product.save()
            }
        }
        toDelete.delete()
        data = setData(status.success, 'product deleted', {})
    } else data = setData(status.not_found, 'This product does not exist', {})
    return data
}


export const resort = async (ref: string, moveTo: number): Promise<TData> => {
    let data = { ...dataI }
    const toResort = await ProductModel.findById(ref)
    if (toResort) {
        const category_id = toResort.category_id
        const curentIndex = toResort.sort || 0
        if (curentIndex > moveTo) {
            const categories = await ProductModel.find({ sort: { $gte: moveTo, $lt: curentIndex }, category_id })
            for (const category of categories) {
                if (category.sort) {
                    category.sort += 1
                    await category.save()
                }
            }
        } else {
            const categories = await ProductModel.find({ sort: { $lte: moveTo, $gt: curentIndex }, category_id })
            for (const category of categories) {
                if (category.sort) {
                    category.sort -= 1
                    await category.save()
                }
            }
        }
        toResort.sort = moveTo
        await toResort.save()
        data = setData(status.success, 'Resorted', {})
    } else data = setData(status.not_found, 'This ref does not exist', {})
    return data
}



export const get = async (category: string): Promise<TData> => {
    let data = { ...dataI }
    const product = await ProductModel.find({ category_id: category })
        .sort({ sort: 1 })
        .populate({
            path: 'skus',
            options: { sort: { sort: 1 } }
        })
    data = setData(status.success, `Those are product in the category '${category}'`, product)
    return data
}