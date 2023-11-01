const ErrorHandler = require("./error-handler");

module.exports = class AuthHelpers {
    static loggedIn(req, res, next) {
        if (req.user) next();
        else res.status(401).json(ErrorHandler.GenerateError(401, ErrorHandler.ErrorTypes.authentication, 'Not logged in!'));
    }

    static adminLoggedIn(req, res, next) {
        if (req.user && req.user.userType == 1) next();
        else res.status(401).json(ErrorHandler.GenerateError(401, ErrorHandler.ErrorTypes.authentication, 'Not logged in!'));
    }
}