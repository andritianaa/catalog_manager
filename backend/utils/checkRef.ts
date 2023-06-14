export const isRefExist = async (model: any, ref: string | undefined, id: string): Promise<Boolean> => {
    const isExist = await model.findOne({ ref })
    if (isExist) {
        if (isExist._id == id) return false
        else return true
    } else return false
}

