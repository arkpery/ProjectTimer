

const Timer = require('../models/timerModel.js');

// Create and Save a new Timer
exports.create = (req, res) => {


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
exports.findAll = (req, res) => {

};


// Find a single timer with a timerId
exports.findOne = (req, res) => {
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

// Update a timer identified by the timerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Timer content can not be empty"
        });
    }


};

// Delete a timer with the specified timerId in the request
exports.delete = (req, res) => {
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