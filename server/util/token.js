const jwt = require('jsonwebtoken');
const constants = require("../config/constants");

module.exports = {
    GENERATE: generateToken
}

function generateToken(data, expiresIn) {
    if (expiresIn == undefined) {
        expiresIn = constants.TOKEN_EXPIRE_IN.toString()
    }
    return jwt.sign(data, constants.JWT_SECRET, { expiresIn: expiresIn });
}