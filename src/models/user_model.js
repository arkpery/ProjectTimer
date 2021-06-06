const mongoose = require("mongoose");
const Group = require("./group_model").Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const Schema = mongoose.Schema;
const translator = require("../services/translate");

const userSchema = mongoose.Schema({
    email: {
        unique: true,
        required: true,
        type: String,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        min: (8, translator.translate("FIVE_CHARACTERS_MIN")),
        max: (32, translator.translate("32_CHARACTERS_MAX")),
        required: translator.translate("PASSWORD_REQUIRED")
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    birthdate: {
        type: Date
    },

    avatar: {
        type: String
    },
    groups: [{
        type: Schema.Types.ObjectId, ref: "Group"
    }],

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const model = mongoose.model("User", userSchema);

module.exports = {
    Model: model,
    Schema: userSchema
};
