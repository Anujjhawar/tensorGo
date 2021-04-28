const jwt = require('jsonwebtoken');
const constants = require("../config/constants");

module.exports = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        const token = req.body.token || req.headers[constants.TOKEN_ADMIN_HEADER_KEY] // || req.query.token
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, constants.JWT_SECRET, function (error, decoded) {
                if (error != null && decoded == null) {
                    return constants.response({
                        error: "Provided token is expired",
                        code: constants.TOKEN_EXPIRED,
                        status: 400
                    }, res);
                }
                console.log("======Account===22");
                console.log(decoded);
                console.log("=====Account====23");
                // type 1 and type 2 must admin 
                req.adminTokenData = decoded;
                // role provided  
                if (roles.length && !roles.some(r => decoded.userTypes.includes(r))) {
                    // Not found in roles 
                    return constants.response({
                        error: "Not authorized to access resource",
                        code: constants.UNAUTHORIZE_ACCESS,
                        status: 400
                    }, res);
                }
                next();
            });
        } else {
            return constants.response({
                error: "Token is missing",
                code: constants.TOKEN_NOT_FOUND,
                status: 400
            }, res);
        }
    }
}