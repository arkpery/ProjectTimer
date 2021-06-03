
const mongoose = require('mongoose');
const Timer = require('../models/timer-model');
const Project = require('../models/project-model');
const { isValidId } = require("../middleware/isValidParamsId")
const { errorHandler } = require('../middleware/errorsHandler')
const AppError = require("../errors/app-errors")


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setTimer = async (req, res) => {
    try {

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
        const project = req.params.timerId
        await projectService.checkValidProjectId(project)


        Timer.find({ project: project })
            .populate('user', ['email', 'firstName', 'lastName'])
            .populate('project', 'name')
            .exec((error, result) => {
                if (error) console.log(error)
                res.status(200).json(result)
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
        const user = req.params.timerId
        await userService.checkValidUserId(user)

        Model.find({ user: user })
            .populate('user', ['email', 'firstName', 'lastName'])
            .populate('project', 'name')
            .exec((error, result) => {
                if (error) console.log(error)
                res.status(200).json(result)
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

    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteTimer = async (req, res) => {
    try {
        const timer = req.params.timerId
        await this.checkTimerId(timer)


        Timer.findByIdAndRemove({ _id: req.params.id }, (error) => {

            res.status(200).json({ "message": "timer successfully removed" })
            if (error) console.log(error)
        })

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
        throw new AppError("This id is not valid : " + id, 400)
    } else {
        const exist = await Timer.exists({ _id: id })
        if (!exist) throw new AppError("This id do not exist : " + id, 400)
    }

    return true
}
