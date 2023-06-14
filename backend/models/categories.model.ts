import { ObjectId } from 'mongoose'

export interface ICategory {
    ref?: ObjectId,
    name: string,
    description?: string,
    tags?: string[],
    thumbnail: string,
    sort?: number,
    afficher?: boolean
}