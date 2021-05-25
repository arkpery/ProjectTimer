const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const Group = require("../models/group_model").Model;
const Timer = require('../models/timerModel.js');


// Create new Project
exports.createProject = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Project content can not be empty!"
        });
    }
    // Create a Project
    const newProject = new Project({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        groups: req.body.groups,
        admin: req.body.admin,
        timer: req.body.timerId
    });

    // Save Project in the database
    newProject.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Project."
            });
        });



};

// Retrieve and return all projects from the database.
exports.findAllProjects = (req, res) => {

    Project.find()
        .then(projects => {
            res.send(projects);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving projects."
            });
        });

};

// Get Project by Id
exports.findOneProject = (req, res) => {
    Project.findById(req.params.projectId)
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.projectId
                });
            }
            res.send(project);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.projectId
                });
            }
            return res.status(500).send({
                message: "Error retrieving project with id " + req.params.projectId
            });
        });
};


// Update Project by Id
exports.updateProject = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Project content can not be empty"
        });
    }

    // Find project and update it with the request body
    Project.findByIdAndUpdate(req.params.projectId, {
        name: req.body.name,
        content: req.body.content
    }, { new: true })
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.projectId
                });
            }
            res.send(project);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.projectId
                });
            }
            return res.status(500).send({
                message: "Error updating project with id " + req.params.projectId
            });
        });
};


// Delete a project with the specified projetId in the request
exports.deleteProject = (req, res) => {
    Project.findByIdAndRemove(req.params.projectId)
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.projectId
                });
            }
            res.send({ message: "Project DELETED successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.projectId
                });
            }
            return res.status(500).send({
                message: "Could not delete project with id " + req.params.projectId
            });
        });
};






