const ErrorHandler = require("./error-handler");
const jwt = require('jsonwebtoken');

module.exports = class AuthHelpers {
    static loggedInNative(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json(ErrorHandler.GenerateError(401, ErrorHandler.ErrorTypes.authentication, 'Unauthorized: Token missing'));
        }
    
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json(ErrorHandler.GenerateError(403, ErrorHandler.ErrorTypes.authentication, 'Unauthorized: Invalid token'));
            }
            next();
        });
    }

    static loggedIn(req, res, next) {
        if (req.user) next();
        else res.status(401).json(ErrorHandler.GenerateError(401, ErrorHandler.ErrorTypes.authentication, 'Not logged in!'));
    }

    static adminLoggedIn(req, res, next) {
        if (req.user && req.user.userType == 1) next();
        else res.status(401).json(ErrorHandler.GenerateError(401, ErrorHandler.ErrorTypes.authentication, 'Not logged in!'));
    }
}