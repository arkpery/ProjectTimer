const mongoose = require("mongoose");
const Group = require("./group_model").Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    email: {
        unique: true,
        required: true,
        type: String
    },
    firstname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    birthdate: {
        type: Date
    },
    groups: [{
        type: Schema.Types.ObjectId, ref: "Group"
    }],
    avatar: {
        type: String
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }
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
