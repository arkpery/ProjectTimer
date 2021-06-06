const jwtMiddleware = require("./jwtMiddleware");
const User = require("../models/user_model").Model;
const Project = require("../models/project-model");
const translator = require("../services/translate");

exports.isMemberOf = (type) => {
    switch (type) {
        case "USER":
            return (async (req, res) => {
                const decoded = jwtMiddleware.decode_token(req);
                const userId = req.params.userId;
                const id = decoded.user.id;
                const user1 = await User.findById(id);
                const user2 = await User.findById(userId);

                if (user1 === null) {
                    res.status(404).json({
                        message: translator.translate("USER_EMPTY")
                    }).end();
                    return;
                }
                if (user2 === null) {
                    res.status(404).json({
                        message: translator.translate("USER_EMPTY")
                    }).end();
                    return;
                }
                const groups1 = user1.groups;
                const groups2 = user2.groups;
                for (let i = 0; i < groups1.length; i++) {
                    const g1 = groups1[i];

                    if (groups2.indexOf(g1) > -1) {
                        next();
                        return;
                    }
                }
                res.status(403).end();
            });
            break;
        case "PROJECT":
            return (async (req, res, next) => {
                const decoded = jwtMiddleware.decode_token(req);
                const projectId = req.params.projectId || req.body.project;
                const id = decoded.user.id;
                const user = await User.findById(id);
                const project = await Project.findById(projectId);

                if (project === null) {
                    res.status(404).json({
                        message: translator.translate("PROJECT_EMPTY")
                    }).end();
                    return;
                }
                if (user === null) {
                    res.status(404).json({
                        message: translator.translate("USER_EMPTY")
                    }).end();
                    return;
                }
                const groups1 = user.groups;
                const groups2 = project.groups;
                for (let i = 0; i < groups1.length; i++) {
                    const g1 = groups1[i];

                    if (groups2.indexOf(g1) > -1) {
                        next();
                        return;
                    }
                }
                res.status(403).end();
            });
            break;
    }
};