const mongoose = require('mongoose')
const Group = require("../models/group_model").Model;
const AppError = require("../errors/app-errors")
const { isValidId } = require('../middleware/isValidParamsId')

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

/**
 * 
 * @param {*} group 
 * @param {*} user 
 * @returns 
 */
exports.checkIfAdmin = async (group, user) => {
    await this.checkValidGroupId(group)

    const fieldsFilter = {
        _id: group,
        admin: {
            _id: user
        }
    }

    const isAdmin = await Group.exists(fieldsFilter)
    if (!isAdmin) throw new AppError("You must be an administrator of this group to perform this operation")

    return true
}

exports.checkValidGroupId = async (id) => {
    if (!isValidId(id)) {
        throw new AppError("This id isn't valid : " + id, 400)
    } else {

        const exist = await Group.exists({ _id: id })
        if (!exist) throw new AppError("This id don't exist : " + id, 400)
    }

    return true
}