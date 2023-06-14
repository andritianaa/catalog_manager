import mongoose, { Schema } from "mongoose"
import { ICategory } from "../categories.model"

const categorySchema = new Schema<ICategory>({
    ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        default: new mongoose.Types.ObjectId()
    },
    name: String,
    description: { type: String, require: false },
    tags: [{ type: String }],
    thumbnail: { type: String, require: true },
    sort: { type: Number, default: 0 },
    afficher: { type: Boolean, default: true }
})

export const CategoryModel = mongoose.model('categories', categorySchema)