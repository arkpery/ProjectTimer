const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const translator = require("../services/translate");

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, translator.translate("GROUP_NAME_REQUIRED")],
        match: /[a-z]/,
        minlength: [3, translator.translate("GROUP_NAME_TOO_LONG")],
    },
    admin: {
        type: ObjectId,
        ref: 'User',
        required: [true, translator.translate("ADMIN_REQUIRED")]
    },
    members: [{
        type: ObjectId,
        ref: 'User',
        required: [true, translator.translate("MEMBER_REQUIRED")]
    }],

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


const model = mongoose.model("Group", groupSchema)

module.exports = {
    Model: model,
    Schema: groupSchema
};
