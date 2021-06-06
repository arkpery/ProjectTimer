const mongoose = require('mongoose')
const Group = require("../models/group_model").Model;
const AppError = require("../errors/app-errors")
const { isValidId } = require('../middleware/isValidParamsId')
const translator = require("../services/translate");

/**
 * 
 * @param {*} list 
 * @returns 
 */
exports.checkListGroups = async (list) => {
    let notExist = []
    let notValid = []
    const hasDuplicate = new Set(list).size !== list.length
    if (hasDuplicate) throw new AppError(translator.translate("GROUP_DUPLICATED_LIST"))

    for (let i = 0; i < list.length; i++) {
        const id = list[i]
        if (!isValidId(id)) {
            notValid.push(id)
        } else {
            const exists = await Group.exists({ _id: id })
            if (!exists) notExist.push(id)
        }
    }
    if (notExist.length || notValid.length) {
        throw new AppError(translator.translate("ID_ARENT_VALID", notExist.toString(), notValid.toString()))

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
    if (!isAdmin) throw new AppError(translator.translate("GROUP_ADMINISTRATOR"))

    return true
}

exports.checkValidGroupId = async (id) => {
    if (!isValidId(id)) {
        throw new AppError(translator.translate("ID_NOT_VALID", id), 400)
    } else {

        const exist = await Group.exists({ _id: id })
        if (!exist) throw new AppError(translator.translate("ID_NOT_EXIST", id), 400)
    }

    return true
}
