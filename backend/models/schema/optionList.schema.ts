import { Schema, ObjectId } from 'mongoose'
import { IOptionList } from '../optionList.model'
import mongoose from 'mongoose'
const list = new Schema<IOptionList>({
    name: String,
    min_selections: Number,
    max_selections: Number,
    tags: [{ type: String }],
    options: [{ type: mongoose.Types.ObjectId, ref: 'options' }],
    sort: Number
})

export const OptionListModel = mongoose.model('OptionList', list)