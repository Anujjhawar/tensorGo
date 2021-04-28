const constant = require("../config/constants");

module.exports.errorHandler = (req, res, next) => {
    const error = new Error(constant.DATA_NOT_FOUND);
    error.status = 400; // It was force set up
    next(error);
};
module.exports.errorHandlerAll = (error, req, res, next) => {
    constant.response({
        code: error.message,
        status: error.status || 500,
        error: constant.INVALID_REQUEST,
    }, res);
    next();
};