import { Schema } from "mongoose"
import { IProduct } from '../products.model'
import mongoose from 'mongoose'

const productSchema = new Schema<IProduct>({
    ref: String,
    category_id: { type: mongoose.Types.ObjectId, ref: 'categories' },
    name: String,
    thumbnail: String,
    description: String,
    tags: [{ type: String }],
    skus: [{ type: mongoose.Types.ObjectId, ref: 'skus' }],
    sort: { type: Number, default: 1 },
    afficher: { type: Boolean, default: true }
})

export const ProductModel = mongoose.model('products', productSchema) 