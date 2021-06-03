const Project = require('../models/project-model');
const groupServices = require('../services/groups-services')
const userServices = require('../services/users-services')
const { isValidId } = require('../middleware/isValidParamsId')
const AppError = require("../errors/app-errors")
const projectJwt = require('../middleware/jwtMiddleware')



/**
 * Check if the data sent in the request is valid for the operation. Throws errors if not.
 * @param {Array} req 
 * @return true
 */
exports.verifData = async (req) => {
    const groups = req.body.groups
    if (!groups) throw new AppError('Please insert a group')
    await groupServices.checkListGroups(groups)

    const project = req.params.projectId
    const name = req.body.name
    const close = req.body.close
    const public = req.body.public
    console.log(project)
    const admin = req.body.admin
    if (admin) {
        await userServices.checkValidUserId(admin)
    } else {
        const adm = await Project.findById(project);

        console.log(adm)
    }

    if (!close) throw new AppError('Please set if the project is closed or no (set the \"close\" field to true for yes or false for no ) ')
    if (!public) throw new AppError('Please define if the project is visible to everyone or not (set the \"public\" field to true for yes or false for no) ')

    let nameUsed

    if (project) {
        const decoded = await projectJwt.decode_token(req)
        await this.checkIfAdmin(project, decoded.user.id)
        nameUsed = await Project.exists({ _id: { $nin: project }, name: name.trim() })
    } else {
        nameUsed = await Project.exists({ name: name })
    }

    if (nameUsed) throw new AppError('This name is already used')
}

/**
 * 
 * @param {String} id 
 * @return true
 */
exports.checkValidProjectId = async (id) => {
    if (!isValidId(id)) {
        throw new AppError("This id isn't valid : " + id, 400)
    } else {
        const exist = await Project.exists({ _id: id })
        if (!exist) throw new AppError("This id don't exist : " + id, 400)
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
    if (!isAdmin) throw new AppError("You must be an administrator of this project to perform this operation")

    return true
}