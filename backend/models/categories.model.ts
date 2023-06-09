import { ObjectId } from 'mongoose'

export interface ICategory {
    _id: ObjectId,
    ref: string,
    name: string,
    description: string,
    tags: string[],
    thumbnail: string,
    sort: number,
    afficher: boolean
}