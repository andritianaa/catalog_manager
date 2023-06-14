import { Schema, ObjectId } from 'mongoose'
import { IOptionList } from '../optionList.model'
import mongoose from 'mongoose'
const list = new Schema<IOptionList>({
    ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OptionList',
        default: new mongoose.Types.ObjectId()
    },
    name: String,
    min_selections: { type: Number, default: 0 },
    max_selections: Number,
    tags: [{ type: String }],
    options: [{ type: mongoose.Types.ObjectId, ref: 'options' }],
    sort: Number
})

export const OptionListModel = mongoose.model('OptionList', list)