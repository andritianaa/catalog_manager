import { ObjectId } from 'mongoose'
export interface ICategory {
    ref?: string,
    name: string,
    description?: string,
    tags?: string[],
    thumbnail: string,
    sort?: number,
    afficher?: boolean,
    products?: any[]
}