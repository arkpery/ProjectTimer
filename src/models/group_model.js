const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Groupe name is required'],
        match: /[a-z]/,
        minlength: [3, 'Group name too long !'],
    },
    admin: {
        type: ObjectId,
        ref: 'User',
        required: [true, "Admin is required"]
    },
    members: [{
        type: ObjectId,
        ref: 'User',
        required: [true, "Members is required"]
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
