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
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

groupSchema.pre(["update", "save", "updateOne", "findByIdAndUpdate"], () => {
    this.updated_at = Date.now();
});

const model = mongoose.model("Group", groupSchema)

module.exports = {
    Model: model,
    Schema: groupSchema
};
