const mongoose = require("mongoose");
const Group = require("./group_model").Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    email: {
        unique: true,
        required: true,
        type: String,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        min: (8, 'Too short, min is 5 characters'),
        max: (32, 'Too long, max is 32 characters'),
        required: 'Password is required'
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

    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    accessToken: { type: String, default: null },

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
