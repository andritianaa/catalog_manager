import { Schema } from "mongoose"
import { IProduct } from '../products.model'
import mongoose from 'mongoose'

const productSchema = new Schema<IProduct>({
    category_ref: { type: mongoose.Types.ObjectId, ref: 'categories' },
    name: String,
    description: String,
    tags: [{ type: String }],
    skus: [{ type: mongoose.Types.ObjectId, ref: 'skus' }],
    sort: { type: Number, default: 0 },
    afficher: { type: Boolean, default: true }
})

export const ProductModel = mongoose.model('products', productSchema) 