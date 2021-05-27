
const mongoose = require('mongoose');
const Timer = require('../models/timerModel');
const Project = require('../models/projectModel');

exports.createTimer = (req, res) => {
    Timer
        .create({
            description: req.body.description,
            taskType: req.body.taskType,
            created_at: req.body.created_at,
            startTime: req.body.startTime,
        })
        .then(timer => res.status(201).json(timer.apiRepr()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
}
// // Create and Save a new Timer
// exports.createTimer = (req, res) => {


//     // // Validate request
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Timer content can not be empty!"
//         });
//     }

//     // Create a Timer
//     let newTimer = new Timer(req.body);
//     newTimer.id_post = req.params.id_post;

//     // Save Timer in the database
//     newTimer.save()
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Timer."
//             });
//         });
// };


// Retrieve and return all timers from the database.
exports.findAllTimers = (req, res, next) => {
    Timer
        .find()
        .then(timers => {
            res.json(timers.map(timer => timer.apiRepr()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong with the server!' });
        });
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
    const updated = {};
    const updateableFields = ['description', 'taskType'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    Timer
        .findByIdAndUpdate(req.params.timerId, { $set: updated }, { new: true })

        .then(updatedTimer => {
            if (!updatedTimer) {
                return res.status(404).send({
                    message: "Timer not found with id " + req.params.timerId
                });
            }
            res.json(updatedTimer)

        })
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));

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