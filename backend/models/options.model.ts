import { Document, ObjectId } from "mongoose"

export interface IOption {
    _id?: ObjectId,
    name: string,
    price: string,
    default: boolean,
    tags: string[],
    sort?: number,
    afficher: boolean
}