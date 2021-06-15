const AppError = require('../errors/app-errors')

exports.errorHandler = (error, res) => {
    if (process.env.ENV === "dev") {
        console.log(error);
    }
    if (error instanceof AppError) {
        res.status(error.status).json({
            message: error.message
        })
    } else {
        res.status(500).json({
            message: 'Error server'
        })
    }
}