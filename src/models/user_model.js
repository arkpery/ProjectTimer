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
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre(["update", "save", "updateOne", "findByIdAndUpdate"], () => {
    this.updated_at = Date.now();
});

const model = mongoose.model("User", userSchema);

module.exports = {
    Model: model,
    Schema: userSchema
};
