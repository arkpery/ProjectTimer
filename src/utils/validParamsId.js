const mongoose = require('mongoose');

/***
 * Check if given id is valid
 * @param {string} id
 * @returns {Boolean}
 */
exports.isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}