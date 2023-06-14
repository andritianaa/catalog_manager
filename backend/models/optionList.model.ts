import { ObjectId } from "mongoose"

export interface IOptionList {
    ref?: string,
    id?: ObjectId,
    name: string,
    min_selections?: number,
    max_selections?: number | null,
    tags: string[],
    options: ObjectId[],
    sort?: number
}