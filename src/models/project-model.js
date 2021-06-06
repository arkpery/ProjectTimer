const mongoose = require('mongoose');
const translator = require("../services/translate");

/**
 * Define project model
 */
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: translator.translate("PROJECT_NAME_REQUIRED"),
        match: /[a-z]/,
        minlength: [3, translator.translate("PROJECT_NAME_TOO_SHORT")],
        maxlength: [20, translator.translate("PROJECT_TOO_LONG")],
    },

    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: translator.translate("ADMIN_REQUIRED")
    },

    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }],

    close: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Project', projectSchema);
