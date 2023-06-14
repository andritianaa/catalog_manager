export const isRefExist = async (model: any, ref: string): Promise<Boolean> => { return await model.findOne({ ref }) ? true : false }

