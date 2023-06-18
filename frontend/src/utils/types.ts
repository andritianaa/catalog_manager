export interface ICategory {
    ref?: string,
    name: string,
    description?: string,
    tags?: string[],
    thumbnail: string,
    sort?: number,
    afficher?: boolean,
    products?: any[],
    _id?: string
}

export interface IProduct {
    ref?: string,
    category_id?: string,
    name: string,
    description: string,
    tags?: string[],
    thumbnail?: string,
    skus?: any[],
    sort?: number,
    afficher?: boolean,
    _id: string
}

export interface ISku {
    ref?: string,
    name: string,
    price: string,
    option_list_ids: IOptionList[],
    sort?: number,
    afficher: boolean,
    _id: string
}

export interface IOptionList {
    ref?: string,
    name: string,
    min_selections?: number,
    max_selections?: number | null,
    tags: string[],
    options: IOption[],
    sort?: number
}

export interface IOption {
    ref?: string,
    name: string,
    price: string,
    default: boolean,
    tags: string[],
    sort?: number,
    afficher: boolean,
    _id: string,
}