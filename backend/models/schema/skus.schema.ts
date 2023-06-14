import { Schema } from 'mongoose'
import { ISku } from '../skus.model'
import mongoose from 'mongoose'
const skuSchema = new Schema<ISku>({
    ref: String,
    price: String,
    name: String,
    sort: { type: Number, default: 1 },
    afficher: { type: Boolean, default: true },
    option_list_ids: [{ type: mongoose.Types.ObjectId, ref: 'options' }]
})

export const SkuModel = mongoose.model('skus', skuSchema)