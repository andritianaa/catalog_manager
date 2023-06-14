import { ObjectId } from 'mongoose'

export interface ISku {
    ref?: string,
    id?: ObjectId,
    name: string,
    price: string,
    option_list_ids: ObjectId[],
    sort?: number,
    afficher: boolean
}