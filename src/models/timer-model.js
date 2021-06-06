const mongoose = require('mongoose');

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
        require: "User is required"
    },

    startTime: {
        type: Date,
        default: Date.now()
    },

    duration: {
        type: Number,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }

}
);


module.exports = mongoose.model('Timer', TimerSchema);