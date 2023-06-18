import { IProduct } from './products.model';
export interface ICategory {
    ref?: string,
    name: string,
    description?: string,
    tags?: string[],
    thumbnail: string,
    sort?: number,
    afficher?: boolean,
    products?: IProduct[]
}