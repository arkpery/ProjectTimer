const Timer = require('../models/timer-model');
const translator = require("./translate");
const AppError = require("../errors/app-errors");

exports.getTimersStartedByProject = async (projectId) => {
    const timers = await Timer.find({
        "$or": [
            {
                duration: 0
            },
            {
                duration: undefined
            }
        ],
        project: projectId
    });

    return (timers);
}

exports.canStart = async (projectId) => {
    const timers = await this.getTimersStartedByProject(projectId);

    if (timers.length > 0) {
        throw new AppError(translator.translate("PROJECT_NO_LOG"));
    }
};

exports.canStop = async (projectId) => {
    const timers = await this.getTimersStartedByProject(projectId);

    if (timers.length !== 1) {
        throw new AppError(translator.translate("TIMERS_ALREADY_STARTED"));
    }
};