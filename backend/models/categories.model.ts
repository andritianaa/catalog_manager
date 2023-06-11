import { ObjectId } from 'mongoose'

export interface ICategory {
    _id?: ObjectId,
    name: string,
    description?: string,
    tags?: string[],
    thumbnail: string,
    sort?: number,
    afficher?: boolean
}