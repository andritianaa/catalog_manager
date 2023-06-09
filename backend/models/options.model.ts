import { ObjectId } from "mongoose"

export interface IOption {
    _id: string,
    ref: string,
    name: string,
    price: string,
    default: boolean,
    tages: string[],
    sort: number,
    afficher: boolean
}