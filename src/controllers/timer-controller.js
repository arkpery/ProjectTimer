const mongoose = require('mongoose');
const Timer = require('../models/timer-model');
const Project = require('../models/project-model');
const { isValidId } = require("../middleware/isValidParamsId")
const { errorHandler } = require('../middleware/errorsHandler')
const AppError = require("../errors/app-errors")
const projectService = require("../services/projects-service");
const userService = require('../services/users-services');
const translator = require("../services/translate");
const timersService = require("../services/timers-services");
const jwt = require("../middleware/jwtMiddleware");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setTimer = async (req, res) => {
    try {
        const t = req.body;
        t.duration = 0;
        const timer = new Timer(t);
        await timer.save(async (error, created) => {
            if (error) console.log(error)
            await created.populate({
                path: "user",
                select: 'groups email firstname',
            }).populate('project').execPopulate();
            return res.status(200).json({
                message: translator.translate("TIMER_CREATED_SUCCESSFULLY"),
                created
            })
        });
    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getTimerByProject = async (req, res) => {
    try {
        const project = req.params.projectId;
        await projectService.checkValidProjectId(project)

        Timer.find({ project: project })
            .populate('user', ['email', 'firstName', 'lastName'])
            .populate('project', 'name')
            .exec((error, result) => {
                if (error) console.log(error);
                res.status(200).json(result);
            })

    } catch (error) {
        errorHandler(error, res)
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getTimerByUser = async (req, res) => {
    try {
        const user = req.params.userId;
        await userService.checkValidUserId(user)

        Timer.find({ user: user })
            .populate('user', ['email', 'firstName', 'lastName'])
            .populate('project', 'name')
            .exec((error, result) => {
                if (error) console.log(error);
                res.status(200).json(result);
            })

    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateTimer = async (req, res) => {
    try {
        try {
            await Timer.findByIdAndUpdate(req.params.timerId, req.body);
            await Timer.findById(req.params.timerId)
                .populate('user', ['groups', 'email', 'firstName', 'lastName'])
                .populate('project')
                .exec((error, result) => {
                    if (error) console.log(error);

                    res.status(200).json(result);
                });
        } catch (error) {
            errorHandler(error, res);
        }
    } catch (error) {
        errorHandler(error, res);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteTimer = async (req, res) => {
    try {
        const timer = req.params.timerId;
        await this.checkTimerId(timer);

        Timer.findByIdAndRemove({ _id: timer }, (error) => {
            res.status(200).json({ "message": translator.translate("TIMER_REMOVED_SUCCESSFULLY") })
            if (error) console.log(error)
        });

    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
exports.checkTimerId = async (id) => {
    if (!isValidId(id)) {
        throw new AppError(`${translator.translate("ID_NOT_VALID")} ${id}`, 400)
    } else {
        const exist = await Timer.exists({ _id: id })
        if (!exist) throw new AppError(`${translator.translate("ID_NOT_EXIST")} ${id}`, 400)
    }
    return true
}


exports.startTimer = async (req, res) => {
    try {
        const decoded = jwt.decode_token(req);

        await timersService.canStart(req.params.projectId);
        const t = req.body;
        t.startTime = Date.now();
        t.duration = 0;
        t.user = decoded.user.id;
        t.project = req.params.projectId;
        const timer = new Timer(t);
        await timer.save(async (error, created) => {
            if (error) console.log(error)
            await created.populate({
                path: "project",
            }).populate('user').execPopulate();
            return res.status(201).json({
                message: translator.translate("TIMER_CREATED_SUCCESSFULLY"),
                created
            });
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

exports.stopTimer = async (req, res) => {
    try {
        await timersService.canStop(req.params.projectId);
        const timer = await Timer.findById(req.params.id);
        timer.duration = Date.now() - timer.startTime;
        await Timer.findByIdAndUpdate(req.params.id, timer);
        await Timer.findById(req.params.id)
            .populate('user')
            .populate('project')
            .exec((error, result) => {
                if (error) console.log(error);

                res.status(200).json({
                    message: translator.translate("TIMER_STOPPED_SUCCESSFULLY"),
                    result
                });
            });
    } catch (error) {
        errorHandler(error, res);
    }
};
