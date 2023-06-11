import { ObjectId } from 'mongoose'

export interface IProduct {
    category_ref?: ObjectId,
    name: string,
    description: string,
    tags?: string[],
    skus?: ObjectId[],
    sort?: number,
    afficher?: boolean
}