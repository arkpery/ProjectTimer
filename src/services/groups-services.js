const mongoose = require('mongoose')
const Model = mongoose.model("Group")
const AppError = require("../errors/app-errors")
const { isValidId } = require('../utils/validParamsId')

/**
 * 
 * @param {*} list 
 * @returns 
 */
exports.checkListGroups = async (list) => {
    let notExist = []
    let notValid = []
    const hasDuplicate = new Set(list).size !== list.length
    if (hasDuplicate) throw new AppError("There is duplicated values in the group list provided")

    for (let i = 0; i < list.length; i++) {
        const id = list[i]
        if (!isValidId(id)) {
            notValid.push(id)
        } else {
            const exists = await Model.exists({ _id: id })
            if (!exists) notExist.push(id)
        }
    }
    if (notExist.length || notValid.length) {
        throw new AppError(`Some id aren't valid or don't exist (not valid : ${notValid}, not exist: ${notExist})`)

    }

    return true
}