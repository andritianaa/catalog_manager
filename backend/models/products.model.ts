import { ObjectId } from 'mongoose'

export interface IProduct {
    ref?: string,
    category_id?: ObjectId,
    name: string,
    description: string,
    tags?: string[],
    thumbnail?: string,
    skus?: ObjectId[],
    sort?: number,
    afficher?: boolean
}