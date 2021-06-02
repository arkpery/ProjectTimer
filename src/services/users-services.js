const bcrypt = require('bcrypt')
const User = require("../models/user_model").Model;
const AppError = require('../errors/app-errors')
const { isValidId } = require("../utils/validParamsId")

/**
 * 
 * @param {String} id 
 * @return true
 */
exports.checkValidUserId = async (id) => {
    if (!isValidId(id)) {
        throw new AppError("This id is not valid : " + id, 400)
    } else {
        const exist = await User.exists({ _id: id })
        if (!exist) throw new AppError("This id do not exist : " + id, 400)
    }

    return true
}