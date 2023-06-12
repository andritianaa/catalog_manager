import { ObjectId } from 'mongoose'

export interface ISku {
    _id?: ObjectId,
    name: string,
    price: string,
    option_list_refs: ObjectId[],
    sort?: number,
    afficher: boolean
}