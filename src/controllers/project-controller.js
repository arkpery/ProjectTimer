const mongoose = require('mongoose');
const Project = require('../models/project-model');
const Group = require("../models/group_model").Model;
const Timer = require('../models/timer-model.js');
const User = require('../models/user_model');
const projectServices = require('../services/projects-service')
const projectJwt = require('../middleware/jwtMiddleware')
const { errorHandler } = require('../middleware/errorsHandler')



/**
 * 
 * @param {Array} req 
 * @param {*} res 
 */
exports.createProject = async (req, res) => {
    try {
        await projectServices.verifData(req)

        // Create a Project
        const newProject = new Project(
            {
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                groups: req.body.groups,
                admin: req.body.admin,
                timer: req.body.timerId,
                close: req.body.close,
                public: req.body.public
            });

        newProject.save(async (error, created) => {
            if (error) console.log(error)
            await created.populate({
                path: "groups",
                select: 'name admin members',
                populate: {
                    path: "members",
                    select: 'email firstname lastname groups avatar',
                },
            }).populate('admin', ['email', 'firstname', 'lastname']).execPopulate();
            return res.status(200).json({
                message: "Project created successfully",
                created
            })
        });



    } catch (error) {
        console.log(error)
    }
};

/**
 * 
 * @param {Array} req 
 * @param {*} res 
 */
exports.getAllProjects = async (req, res) => {
    try {
        await Project.find({})
            .populate('groups', ['name', 'admin', 'members'])
            .populate('admin', ['email', 'firstName', 'lastName'])
            .exec((error, result) => {
                if (error) console.log(error)
                res.status(200).json(result);
            })
    } catch (error) {
        errorHandler(error, res)
    }
};


/**
 * 
 * @param {Array} req 
 * @param {*} res 
 */
exports.getProjectById = async (req, res) => {
    try {
        const project = req.params.projectId
        await projectServices.checkValidProjectId(project)

        const fieldsFilter = {
            _id: project
        }

        await Project.findById(fieldsFilter)
            .populate('groups', ['name', 'admin', 'members'])
            .populate('admin', ['email', 'firstName', 'lastName'])
            .exec((error, result) => {
                if (error) console.log(error)
                res.status(200).json(result)
            })

    } catch (error) {
        errorHandler(error, res)
    }
};

/**
 * 
 * @param {Array} req 
 * @param {*} res 
 */
exports.updateProject = async (req, res) => {

    try {
        await projectServices.verifData(req)


        const update = {
            name: req.body.name,
            groups: req.body.groups,
            admin: req.body.admin,
            close: req.body.close,
            public: req.body.public
        };

        const fieldsFilter = {
            _id: req.params.projectId
        }

        Project.findOneAndUpdate(fieldsFilter, update, { new: true }, async (error, updated) => {
            if (error) console.log(error)
            await updated.populate('groups', ['name', 'admin', 'members']).execPopulate()
            await updated.populate('admin', ['email', 'firstName', 'lastName']).execPopulate()
            res.status(200).json(updated)
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

/**
 * 
 * @param {Array} req 
 * @param {*} res 
 */
exports.deleteProject = async (req, res) => {
    try {
        const project = req.params.projectId;
        const decoded = await projectJwt.decode_token(req)
        await projectServices.checkIfAdmin(project, decoded.user.id)

        const fieldsFilter = {
            _id: project
        }

        Project.deleteOne(fieldsFilter, (error) => {
            if (error) console.log(error)
            res.status(200).json({ message: `project "${project}" successfully removed` })
        })

    } catch (error) {
        errorHandler(error, res)
    }
}
