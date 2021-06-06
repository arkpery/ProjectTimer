const bcrypt = require('bcrypt')
const User = require("../models/user_model").Model;
const AppError = require('../errors/app-errors')
const { isValidId } = require("../middleware/isValidParamsId")
const translator = require("../services/translate");

/**
 * 
 * @param {String} id 
 * @return true
 */
exports.checkValidUserId = async (id) => {
    if (!isValidId(id)) {
        throw new AppError(`${translator.translate("ID_NOT_VALID")} ${id}`, 400)
    } else {
        const exist = await User.exists({ _id: id })
        if (!exist) throw new AppError(`${translator.translate("ID_NOT_EXIST")} ${id}`, 400)
    }

    return true
}