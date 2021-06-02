const jwt = require('jsonwebtoken');
const User = require('../models/user_model');


const jwtKey = process.env.JWT_KEY;

/**
 * 
 * @param {Array} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verify_token = (req, res, next) => {
    const token = req.headers.authorization;

    if (typeof token !== 'undefined') {
        jwt.verify(token, jwtKey, (error, authData) => {
            if (error) {
                res.status(401);
                res.json({ message: "Auth failed, bad token ! " })
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(401);
        res.json({ message: "Auth failed, bad token ! " })
    }


}

/**
 * 
 * @param {Array} req 
 * @param {*} res 
 * @returns  
 */
exports.decode_token = (req, res) => {

    const usertoken = req.rawHeaders[1];

    const decoded = jwt.verify(usertoken, jwtKey);
    console.log(decoded)
    return decoded

}

