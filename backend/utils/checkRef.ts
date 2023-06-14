export const isRefExist = async (model: any, ref: string | undefined): Promise<Boolean> => { return await model.findOne({ ref }) ? true : false }

