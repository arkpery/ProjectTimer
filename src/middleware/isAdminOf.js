const jwtMiddleware = require("./jwtMiddleware");
const User = require("../models/user_model").Model;
const Project = require("../models/project-model");
const Group = require("../models/group_model").Model;
const Timer = require("../models/timer-model");

exports.isAdminOf = (type) => {
    switch (type) {
        case "PROJECT":
            return (async (req, res, next) => {
                const decoded = jwtMiddleware.decode_token(req);
                const id = decoded.user.id;
                const projectId = req.params.projectId;
                const project = await Project.findById(projectId);
        
                if (project.admin.toString() === id.toString()) {
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
                const group = await Group.findById(groupId);
        
                if (group.admin.toString() === id.toString()) {
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
                const timer = await Timer.findById(timerId).populate("project");
        
                console.log(timer.project.admin.toString());
                console.log(id.toString());
                if (timer.project.admin.toString() === id.toString()) {
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
                const project = await Project.findById(projectId);
        
                if (project.admin.toString() === id.toString()) {
                    return next();
                }
                res.status(403).end();
            });
        break;
    }

};
