import { ObjectId } from "mongoose"

export interface IOptionList {
    _id: ObjectId,
    ref: string,
    name: string,
    min_selections: number,
    max_selections: number,
    tags: string[],
    options: ObjectId[],
    sort: number
}