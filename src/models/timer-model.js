const mongoose = require('mongoose');
const translator = require("../services/translate");

/**
 * Define timer model
 */
const TimerSchema = mongoose.Schema({
    description: {
        type: String
    },

    taskType: {
        type: String
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: translator.translate("USER_REQUIRED"),
        required: true
    },

    startTime: {
        type: Date,
        default: Date.now()
    },

    duration: {
        type: Number,
        required: true
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = mongoose.model('Timer', TimerSchema);