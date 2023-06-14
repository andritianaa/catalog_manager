import { Document, ObjectId } from "mongoose"

export interface IOption {
    ref?: string,
    id?: ObjectId,
    name: string,
    price: string,
    default: boolean,
    tags: string[],
    sort?: number,
    afficher: boolean
}