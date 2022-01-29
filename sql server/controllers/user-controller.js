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
        this.router.post('/logout', AuthHelpers.loggedIn, (req, res) => this.logout(req, res));
        this.router.post('/register', (req, res) => this.register(req, res));
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

    async logout(req, res) {
        try {
            await req.logout();

            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };


    async register(req, res) {
        try {
            const body = req.body;

            if (!body.email || !body.password || !body.firstName || !body.lastName || !body.sex) {
                if (!body.email) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.data, 'Email is required!'));
                } else if (!body.password) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Password is required!'));
                } else if (!body.firstName) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'First Name is required!'));
                } else if (!body.lastName) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Last Name is required!'));
                } else if (!body.sex) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Sex is required!'));
                } else if (!body.userType) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'User Type is required!'));
                }
            } else {
                const password = bcrypt.hashSync(body.password, 10);
                let dateObj = new Date();
                let date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`

                let userData = await MysqlAdapter.query(`
                    INSERT IGNORE INTO users (email,password,first_name,last_name,sex,created_on)
                    VALUES(
                        ${escape(body.email)},
                        "${password}",
                        ${escape(body.firstName)},
                        ${escape(body.lastName)},
                        ${escape(body.sex)},
                        "${date}"
                    )
                    returning id
                `)

                if (userData.length <= 0) {
                    res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.authentication, 'Email already exists!'));
                    return;
                }

                const id = userData[0].id;
                dateObj = new Date(dateObj.setDate(dateObj.getDate() + 30));
                date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`

                let registrationConfirmationData = await MysqlAdapter.query(`
                    INSERT IGNORE INTO registration_confirmation (user_id,expires_on,token)
                    VALUES(
                        "${id}",
                        "${date}",
                        UUID()
                    )
                    returning token
                `)

                if (registrationConfirmationData[0].length <= 0) {
                    await MysqlAdapter.query(`DELETE FROM users WHERE id = ${id}`)
                    res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.authentication, 'Something went wrong, please try again!'));
                    return;
                }

                res.json({ token: registrationConfirmationData[0].token });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

}