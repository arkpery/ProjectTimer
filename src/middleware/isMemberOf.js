const jwtMiddleware = require("./jwtMiddleware");
const User = require("../models/user_model").Model;
const Project = require("../models/project-model");
const translator = require("../services/translate");
const AppError = require("../errors/app-errors");
const isValidParamsId = require("./isValidParamsId");

exports.isMemberOf = (type) => {
    switch (type) {
        case "USER":
            return (async (req, res, next) => {
                try {
                    const decoded = jwtMiddleware.decode_token(req);
                    const userId = req.params.userId;
                    const id = decoded.user.id;
                    const user1 = await User.findById(id);
    
                    if (!isValidParamsId.isValidId(userId)) {
                        throw new AppError(translator.translate("ID_NOT_VALID", userId), 404);
                    }
                    const user2 = await User.findById(userId);
    
                    if (user1 === null) {
                        throw new AppError(translator.translate("USER_EMPTY"), 404);
                    }
                    if (user2 === null) {
                        throw new AppError(translator.translate("USER_EMPTY"), 404);
                    }
                    const groups1 = user1.groups;
                    const groups2 = user2.groups;
                    for (let i = 0; i < groups1.length; i++) {
                        const g1 = groups1[i];
                        if (groups2.indexOf(g1) > -1) {
                            return next();
                        }
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
        case "PROJECT":
            return (async (req, res, next) => {
                try {
                    const decoded = jwtMiddleware.decode_token(req);
                    const projectId = req.params.projectId || req.body.project;
                    const id = decoded.user.id;
                    if (!isValidParamsId.isValidId(projectId)) {
                        throw new AppError(translator.translate("ID_NOT_VALID", projectId), 404);
                    }
                    const user = await User.findById(id);
                    const project = await Project.findById(projectId);
    
                    if (project === null) {
                        throw new AppError(translator.translate("PROJECT_EMPTY"), 404);
                    }
                    if (user === null) {
                        throw new AppError(translator.translate("USER_EMPTY"), 404);
                    }
                    const groups1 = user.groups;
                    const groups2 = project.groups;
                    for (let i = 0; i < groups1.length; i++) {
                        const g1 = groups1[i];
    
                        if (groups2.indexOf(g1) > -1) {
                            return next();
                        }
                    }
                    throw new AppError(translator.translate("PROJECT_MEMBERS"), 403);
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