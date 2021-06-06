const Timer = require('../models/timer-model');
const translator = require("./translate");
const AppError = require("../errors/app-errors");

exports.getTimersStartedByProject = async (projectId) => {
    const timers = await Timer.find({
        duration: 0,
        project: projectId
    });

    return (timers);
}

exports.canStart = (projectId) => {
    const timers = this.getTimersStartedByProject(projectId);

    if (timers.length > 0){
        throw new AppError(translator.translate("PROJECT_NO_LOG"));
    }
};

exports.canStop = (projectId) => {
    const timers = this.getTimersStartedByProject(projectId);

    if (timers !== 1){
        throw new AppError(translator.translate("TIMERS_ALREADY_STARTED"));
    }
};
