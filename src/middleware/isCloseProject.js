const jwtMiddleware = require("./jwtMiddleware");
const User = require("../models/user_model").Model;
const Project = require("../models/project-model");
const translator = require("../services/translate");
const AppError = require("../errors/app-errors");
const isValidParamsId = require("./isValidParamsId");

exports.isCloseProject = () => {
    return (async (req, res, next) => {
        try {
            const projectId = req.params.projectId;

            if (!isValidParamsId.isValidId(projectId)) {
                throw new AppError(translator.translate("ID_NOT_VALID", userId), 404);
            }
            const project = await Project.findById(projectId);
            if (project.close){
                res.status(403).json({
                    message: "The project is close !"
                })
            }
            else {
                next();
            }
        } catch (e) {
            if (e instanceof AppError) {
                res.status(e.status).json({
                    message: e.message
                });
            } else {
                res.status(403).end();
            }
        }
    });
};