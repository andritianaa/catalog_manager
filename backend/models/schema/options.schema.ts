import mongoose, { Schema } from 'mongoose'
import { IOption } from '../options.model'

const optionSchema: Schema<IOption> = new Schema<IOption>({
    name: String,
    price: { type: String, required: true },
    default: { type: Boolean, default: false },
    tags: [{ type: String }],
    sort: { type: Number, default: 0 },
    afficher: { type: Boolean, default: true }
})
export const OptionModel = mongoose.model('options', optionSchema)

