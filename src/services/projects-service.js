const Project = require('../models/project-model');
const groupServices = require('../services/groups-services');
const userServices = require('../services/users-services');
const { isValidId } = require('../middleware/isValidParamsId');
const AppError = require("../errors/app-errors");
const projectJwt = require('../middleware/jwtMiddleware');
const translator = require("./translate");



/**
 * Check if the data sent in the request is valid for the operation. Throws errors if not.
 * @param {Array} req 
 * @return true
 */
exports.verifData = async (req) => {
    const groups = req.body.groups
    if (!groups || !groups.length) throw new AppError(translator.translate("PLEASE_INSERT_GROUP"))
    await groupServices.checkListGroups(groups)
    const project = req.params.projectId
    const name = req.body.name
    const close = req.body.close

    if (close === undefined) throw new AppError(translator.translate("PLEASE_PROJECT_CLOSED"));

    let nameUsed

    if (project){
        await this.checkValidProjectId(project);
    }
    if (project) {
        nameUsed = await Project.exists({ _id: { $nin: project }, name: name.trim() })
    } else {
        nameUsed = await Project.exists({ name: name })
    }

    if (nameUsed) throw new AppError(translator.translate("NAMED_ALREADY_USED"));
}

/**
 * 
 * @param {String} id 
 * @return true
 */
exports.checkValidProjectId = async (id) => {
    if (!isValidId(id)) {
        throw new AppError(`${translator.translate("ID_NOT_VALID")}`, 400)
    } else {
        const exist = await Project.exists({ _id: id })
        if (!exist) throw new AppError(`${translator.translate("ID_NOT_EXIST")} ${id}`, 400)
    }

    return true
}



/**
 * 
 * @param {*} project 
 * @param {*} user 
 * @returns 
 */
exports.checkIfAdmin = async (project, user) => {
    await this.checkValidProjectId(project)

    const fieldsFilter = {
        _id: project,
        admin: {
            _id: user
        }
    }

    const isAdmin = await Project.exists(fieldsFilter)
    if (!isAdmin) throw new AppError(translator.translate("PROJECT_ADMINISTRATOR"));

    return true
};

exports.verifyAdmin = async (req) => {
    const decoded = projectJwt.decode_token(req);

    await this.checkIfAdmin(req.params.projectId, decoded.user.id);
};