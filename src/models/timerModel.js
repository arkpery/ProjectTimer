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
        require: "Admin is required"
    },

    startTime: {
        type: Date,
        default: Date.now
    },

    duration: {
        type: Date,
        default: Date.now
    },

    // project: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Project',
    //     required: true
    // },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    logs: [{
        seconds: Number,
        endDate: { type: Date, default: new Date() }
    }]

}
);

TimerSchema.virtual('totalTimeInSeconds').get(function () {
    return this.logs.reduce(function (totalTimeInSeconds, log) {
        return totalTimeInSeconds + log.seconds;
    }, 0);
});

TimerSchema.methods.apiRepr = function () {
    return {
        _id: this._id,
        description: this.description,
        taskType: this.taskType,
        created_at: this.created_at,
        projectNotes: this.projectNotes,
        totalTimeInSeconds: this.totalTimeInSeconds,
        isRunning: false,
        currentEntryCount: 0
    };
}

module.exports = mongoose.model('Timer', TimerSchema);