import { ObjectId } from 'mongoose'

export interface IProduct {
    ref?: string,
    id?: ObjectId,
    category_id?: ObjectId,
    name: string,
    description: string,
    tags?: string[],
    skus?: ObjectId[],
    sort?: number,
    afficher?: boolean
}