const mongoose = require('mongoose');

/**
 * Define timer model
 */
const TimerSchema = mongoose.Schema({
    // id_timer : {
    //     type: String
    // },
    description: {
        type: String
    },

    // taskType: {
    //     type: String
    // },

    // user: {

    // },

    startTime: {
        type: Date,
        default: Date.now
    },

    duration: {
        type: Date,
        default: Date.now
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}
);

module.exports = mongoose.model('Timer', TimerSchema);