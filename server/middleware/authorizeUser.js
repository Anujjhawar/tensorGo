const jwt = require('jsonwebtoken');
const constants = require("../config/constants");

module.exports = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        const token = req.body.userToken || req.headers[constants.TOKEN_USER_HEADER_KEY] // || req.query.userToken
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, constants.JWT_SECRET, function (error, decoded) {
                if (error) {
                    return constants.response({
                        error: "User Token Expired",
                        code: constants.USER_TOKEN_EXPIRED
                    }, res);
                }
                console.log("===User======22");
                console.log(decoded);
                console.log("=====User====23");
                req.userTokenData = decoded;
                // role provided  
                if (roles.length && !roles.some(r => decoded.userTypes.includes(r))) {
                    // Not found in roles 
                    return constants.response({
                        error: "Not authorized to access user resource",
                        code: constants.USER_UNAUTHORIZE_ACCESS
                    }, res);
                }
                next();
            });
        } else {
            return constants.response({
                error: "User Token is missing",
                code: constants.USER_TOKEN_NOT_FOUND
            }, res);
        }
    }
}