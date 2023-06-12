import { Schema } from 'mongoose'
import { ISku } from '../skus.model'
import mongoose from 'mongoose'
const skuSchema = new Schema<ISku>({
    price: String,
    name: String,
    sort: { type: Number, default: 0 },
    afficher: { type: Boolean, default: true },
    option_list_refs: [{ type: mongoose.Types.ObjectId, ref: 'options' }]
})

export const SkuModel = mongoose.model('skus', skuSchema)