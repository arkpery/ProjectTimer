const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    admin: {
        type: ObjectId,
        ref: "User"
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


const model = mongoose.model("Group", groupSchema)

module.exports = {
    Model: model,
    Schema: groupSchema
};
