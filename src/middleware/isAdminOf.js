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
                const decoded = jwtMiddleware.decode_token(req);
                const id = decoded.user.id;
                const projectId = req.params.projectId;

                if (!isValidParamsId.isValidId(projectId)) {
                    res.status(404).json({
                        message: translator.translate("ID_NOT_VALID", projectId)
                    });
                    return;
                }
                const project = await Project.findById(projectId);

                if (!project) {
                    res.status(404).json({
                        message: translator.translate("PROJECT_EMPTY")
                    });
                    return;
                } else if (project.admin.toString() === id.toString()) {
                    return next();
                }
                res.status(403).end();
            });
            break;

        case "GROUP":
            return (async (req, res, next) => {
                const decoded = jwtMiddleware.decode_token(req);
                const id = decoded.user.id;
                const groupId = req.params.groupId;
                if (!isValidParamsId.isValidId(groupId)) {
                    res.status(404).json({
                        message: translator.translate("ID_NOT_VALID", groupId)
                    });
                    return;
                }
                const group = await Group.findById(groupId);

                if (group === null) {
                    res.status(404).json({
                        message: translator.translate("GROUP_EMPTY")
                    });
                    return;
                }
                else if (group.admin.toString() === id.toString()) {
                    return next();
                }
                res.status(403).end();
            });
            break;

        case "TIMER":
            return (async (req, res, next) => {
                const decoded = jwtMiddleware.decode_token(req);
                const id = decoded.user.id;
                const timerId = req.params.timerId;

                if (!isValidParamsId.isValidId(timerId)) {
                    res.status(404).json({
                        message: translator.translate("ID_NOT_VALID", timerId)
                    });
                    return;
                }
                const timer = await Timer.findById(timerId).populate("project");

                if (timer === null) {
                    res.status(404).json({
                        message: translator.translate("TIMER_EMPTY")
                    });
                    return;
                } else if (timer.project.admin.toString() === id.toString()) {
                    return next();
                }
                res.status(403).end();
            });
            break;

        default:
            return (async (req, res, next) => {
                const decoded = jwtMiddleware.decode_token(req);
                const id = decoded.user.id;
                const projectId = req.params.projectId;

                if (!isValidParamsId.isValidId(projectId)) {
                    res.status(404).json({
                        message: translator.translate("ID_NOT_VALID", projectId)
                    });
                    return;
                }
                const project = await Project.findById(projectId);

                if (project === null) {
                    res.status(404).json({
                        message: translator.translate("PROJECT_EMPTY")
                    });
                    return;
                }
                else if (project.admin.toString() === id.toString()) {
                    return next();
                }
                res.status(403).end();
            });
            break;
    }

};