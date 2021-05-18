

const Timer = require('../models/timerModel');

// Create and Save a new Timer
exports.create = (req, res) => {


    // // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Project content can not be empty!"
        });
    }

    // Create a Project
    let newTimer = new Timer(req.body);
    newTimer.id_post = req.params.id_post;

    // Save Project in the database
    newTimer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the newTimer."
            });
        });
};
