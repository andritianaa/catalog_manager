import { TData, setData, status } from './response';
export const sort = async (model: any, moveTo: number, _id: string): Promise<TData> => {
    let data: TData = {
        message: "Data not yet processed",
        value: {}
    }
    const toResort = await model.findById(_id)
    if (toResort) {
        const curentIndex = toResort.sort || 0
        if (curentIndex > moveTo) {
            const categories = await model.find({ sort: { $gte: moveTo, $lt: curentIndex } })
            for (const category of categories) {
                if (category.sort) {
                    category.sort += 1
                    await category.save()
                }
            }
        } else {
            const categories = await model.find({ sort: { $lte: moveTo, $gt: curentIndex } })
            for (const category of categories) {
                if (category.sort) {
                    category.sort -= 1
                    await category.save()
                }
            }
        }
        toResort.sort = moveTo
        await toResort.save()
        data = setData(status.success, 'Resorted', {})
    } else data = setData(status.not_found, 'This _id does not exist', {})
    return data
}