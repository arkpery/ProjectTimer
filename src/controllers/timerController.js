
const mongoose = require('mongoose');
const Timer = require('../models/timerModel');
const Project = require('../models/projectModel');

// Create and Save a new Timer
exports.createTimer = (req, res) => {


    // // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Timer content can not be empty!"
        });
    }

    // Create a Timer
    let newTimer = new Timer(req.body);
    newTimer.id_post = req.params.id_post;

    // Save Timer in the database
    newTimer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Timer."
            });
        });
};


// Retrieve and return all timers from the database.
exports.findAllTimers = (req, res, next) => {
    Timer.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                timer: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        project: doc.project,
                        duration: doc.duration,

                    }
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}


// Get Timer by Id
exports.findOneTimer = (req, res) => {
    Timer.findById(req.params.timerId)
        .then(timer => {
            if (!timer) {
                return res.status(404).send({
                    message: "Timer not found with id " + req.params.timerId
                });
            }
            res.send(timer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Timer not found with id " + req.params.timerId
                });
            }
            return res.status(500).send({
                message: "Error retrieving timer with id " + req.params.timerId
            });
        });
};

// Update Timer by Id
exports.updateTimer = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Project content can not be empty"
        });
    }

    // // Find project and update it with the request body
    // Timer.findByIdAndUpdate(req.params.timerId, {
    //     content: req.body.content
    // }, { new: true })
    //     .then(timer => {
    //         if (!timer) {
    //             return res.status(404).send({
    //                 message: "Timer not found with id " + req.params.timerId
    //             });
    //         }
    //         res.send(`UPDATED successfully : ${timer}`);
    //     }).catch(err => {
    //         if (err.kind === 'ObjectId') {
    //             return res.status(404).send({
    //                 message: "Timer not found with id " + req.params.timerId
    //             });
    //         }
    //         return res.status(500).send({
    //             message: "Error updating timer with id " + req.params.timerId
    //         });
    //     });




};

// Delete Timer 
exports.deleteTimer = (req, res) => {
    Timer.findByIdAndRemove(req.params.timerId)
        .then(timer => {
            if (!timer) {
                return res.status(404).send({
                    message: "Timer not found with id " + req.params.timerId
                });
            }
            res.send({ message: "Timer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Timer not found with id " + req.params.timerId
                });
            }
            return res.status(500).send({
                message: "Could not delete timer with id " + req.params.timerId
            });
        });
};