const mongoose = require('mongoose');
const Project = require('../models/project-model');
const Group = require("../models/group_model").Model;
const Timer = require('../models/timer-model.js');
const User = require('../models/user_model');
const projectServices = require('../services/projects-service');
const groupServices = require("../services/groups-services");
const projectJwt = require('../middleware/jwtMiddleware')
const {
    errorHandler
} = require('../middleware/errorsHandler')
const translator = require("../services/translate");


/**
 * 
 * @param {Array} req 
 * @param {*} res 
 */
exports.createProject = async (req, res) => {
    const decoded = projectJwt.decode_token(req);

    try {
        await projectServices.verifData(req)
        // Create a Project
        const newProject = new Project({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            groups: req.body.groups,
            admin: decoded.user.id,
            timers: [],
            close: req.body.close,
        });

        const created = await newProject.save();
        await created.populate({
            path: "groups",
            populate: {
                path: "members"
            },
        }).populate('admin', ['email', 'firstname', 'lastname']).execPopulate();
        return res.status(201).json({
            message: translator.translate("PROJECT_CREATED_SUCCESSFULLY"),
            created
        })
    } catch (error) {
        errorHandler(error, res);
    }
};

/**
 * 
 * @param {Array} req 
 * @param {*} res 
 */
exports.getAllProjects = async (req, res) => {
    const decoded = await projectJwt.decode_token(req);
    try {
        const groups = await Group.find({
            "$or": [{
                    "members": decoded.user.id
                },
                {
                    "admin": decoded.user.id
                }
            ]
        });
        await Project.find({
                groups: {
                    "$in": groups
                }
            })
            .populate('groups', ['_id', 'name', 'admin', 'members'])
            .populate('admin', ["_id", 'email', 'firstName', 'lastName'])
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
        await projectServices.checkValidProjectId(req.params.projectId);

        await Project.findById(req.params.projectId)
            .populate('groups', ['name', 'admin', 'members'])
            .populate({
                path: "groups",
                populate: {
                    path: "admin"
                }
            })
            .populate({
                path: "groups",
                populate: {
                    path: "members"
                }
            })
            .populate('admin', ['email', 'firstName', 'lastName'])
            .exec((error, result) => {
                if (error) console.log(error)
                res.status(200).json(result)
            });

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
        await projectServices.verifData(req);
        const decoded = projectJwt.decode_token(req);

        const update = {
            name: req.body.name,
            groups: req.body.groups,
            admin: decoded.user.id,
            close: req.body.close,
            public: req.body.public
        };

        const fieldsFilter = {
            _id: req.params.projectId
        }

        Project.findOneAndUpdate(fieldsFilter, update, {
            new: true
        }, async (error, updated) => {
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

        Project.deleteOne({
            _id: project
        }, (error) => {
            if (error) console.log(error)
            res.status(200).json({
                message: translator.translate("PROJECT_DELETED", project)
            })
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

exports.closeProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        await projectServices.checkValidProjectId(projectId);
        const project = await Project.findById(projectId);
        project.close = true;
        await Project.findByIdAndUpdate(projectId, project);
        res.status(200).json({
            message: translator.translate("PROJECT_CLOSED", project)
        });
    } catch (error) {
        errorHandler(error, res)
    }
};


exports.findByGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        await groupServices.checkValidGroupId(groupId);
        const list = await Project.find({
            "groups": {
                "$in": groupId
            }
        });

        res.json(list);
    } catch (error) {
        errorHandler(error, res)
    }
};