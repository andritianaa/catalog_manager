import { Schema } from "mongoose"
import { IProduct } from '../products.model'
import mongoose from 'mongoose'

const productSchema = new Schema<IProduct>({
    ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        default: new mongoose.Types.ObjectId()
    },
    category_id: { type: mongoose.Types.ObjectId, ref: 'categories' },
    name: String,
    description: String,
    tags: [{ type: String }],
    skus: [{ type: mongoose.Types.ObjectId, ref: 'skus' }],
    sort: { type: Number, default: 0 },
    afficher: { type: Boolean, default: true }
})

export const ProductModel = mongoose.model('products', productSchema) 