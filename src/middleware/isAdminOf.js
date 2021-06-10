const jwtMiddleware = require("./jwtMiddleware");
const User = require("../models/user_model").Model;
const Project = require("../models/project-model");
const Group = require("../models/group_model").Model;
const Timer = require("../models/timer-model");
const translator = require("../services/translate");
const isValidParamsId = require("./isValidParamsId");

exports.isAdminOf = (type) => {
    switch (type) {
        case "PROJECT":
            return (async (req, res, next) => {
                try {
                    const decoded = jwtMiddleware.decode_token(req);
                    const id = decoded.user.id;
                    const projectId = req.params.projectId;
    
                    if (!isValidParamsId.isValidId(projectId)) {
                        throw new AppError(translator.translate("ID_NOT_VALID", projectId), 404);
                    }
                    const project = await Project.findById(projectId);
    
                    if (!project) {
                        throw new AppError(translator.translate("PROJECT_EMPTY"), 404);
                    } else if (project.admin.toString() === id.toString()) {
                        return next();
                    }
                }
                catch (e){
                    console.log(e.message);
                    if (e instanceof AppError){
                        res.status(e.status).json({
                            message: e.message
                        });
                    }
                    else {
                        res.status(403).end();
                    }
                }
            });
            break;

        case "GROUP":
            return (async (req, res, next) => {
                try {
                    const decoded = jwtMiddleware.decode_token(req);
                    const id = decoded.user.id;
                    const groupId = req.params.groupId;
                    if (!isValidParamsId.isValidId(groupId)) {
                        throw new AppError(translator.translate("ID_NOT_VALID", groupId), 404);
                    }
                    const group = await Group.findById(groupId);
    
                    if (group === null) {
                        throw new AppError(translator.translate("GROUP_EMPTY"), 404);
                    }
                    else if (group.admin.toString() === id.toString()) {
                        return next();
                    }
                }
                catch (e){
                    if (e instanceof AppError){
                        res.status(e.status).json({
                            message: e.message
                        });
                    }
                    else {
                        res.status(403).end();
                    }
                }
            });
            break;

        case "TIMER":
            return (async (req, res, next) => {
                try {
                    const decoded = jwtMiddleware.decode_token(req);
                    const id = decoded.user.id;
                    const timerId = req.params.timerId;
    
                    if (!isValidParamsId.isValidId(timerId)) {
                        throw new AppError(translator.translate("ID_NOT_VALID", timerId), 404);
                    }
                    const timer = await Timer.findById(timerId).populate("project");
    
                    if (timer === null) {
                        throw new AppError(translator.translate("TIMER_EMPTY", timerId), 404);
                    } else if (timer.project.admin.toString() === id.toString()) {
                        return next();
                    }
                }
                catch (e){
                    if (e instanceof AppError){
                        res.status(e.status).json({
                            message: e.message
                        });
                    }
                    else {
                        res.status(403).end();
                    }
                }
            });
            break;

        default:
            return (async (req, res, next) => {
                try {
                    const decoded = jwtMiddleware.decode_token(req);
                    const id = decoded.user.id;
                    const projectId = req.params.projectId;
    
                    if (!isValidParamsId.isValidId(projectId)) {
                        throw new AppError(translator.translate("ID_NOT_VALID", projectId), 404);
                    }
                    const project = await Project.findById(projectId);
    
                    if (project === null) {
                        throw new AppError(translator.translate("PROJECT_EMPTY", projectId), 404);
                    }
                    else if (project.admin.toString() === id.toString()) {
                        return next();
                    }
                }
                catch (e){
                    if (e instanceof AppError){
                        res.status(e.status).json({
                            message: e.message
                        });
                    }
                    else {
                        res.status(403).end();
                    }  
                }
            });
            break;
    }

};