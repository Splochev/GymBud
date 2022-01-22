const express = require('express');
const ErrorHandler = require('../utils/error-handler');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const AuthHelpers = require('../utils/auth-helpers');

module.exports = class UserController {
    constructor() {
        this.router = express.Router();
        this.attachEndpoints();
    }
    //Dont forget to add AuthHelpers where needed
    attachEndpoints() {
        this.router.post('/login', (req, res) => this.login(req, res));
        this.router.get('/me', AuthHelpers.loggedIn, (req, res) => this.getMe(req, res));
    }

    async login(req, res, next) {
     
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error'));
                console.error(err);
                return;
            }

            if (!user) {
                res.status(401).json(ErrorHandler.GenerateError(401, ErrorHandler.ErrorTypes.authentication, 'Incorrect email or password!'));
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error'));
                    return;
                }

                delete user.password;

                res.json(user);
            });
        })(req, res, next);
    }

    async getMe(req, res) {
        try {
            let request = req.user;
            res.json(request);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };


}