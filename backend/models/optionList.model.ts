import { ObjectId } from "mongoose"

export interface IOptionList {
    _id: ObjectId,
    name: string,
    min_selections: number,
    max_selections: number,
    tags: string[],
    options: ObjectId[],
    sort: number
}