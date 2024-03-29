const express = require('express');
const ErrorHandler = require('../utils/error-handler');
const MysqlAdapter = require('../utils/mysql-adapter');
const AuthHelpers = require('../utils/auth-helpers');
const { escape } = require('mysql');
const passport = require('passport');
const bcrypt = require('bcryptjs');
var nodeOutlook = require('nodejs-nodemailer-outlook')
const jwt = require('jsonwebtoken');
const { generateRandomCode, generateVerificationCodeEmail, generateVerifyRegistrationEmail } = require('../utils/commonFunctions');

module.exports = class UserController {
    constructor() {
        this.router = express.Router();
        this.attachEndpoints();
    }

    attachEndpoints() {
        this.router.post('/login', (req, res) => this.login(req, res));
        this.router.get('/me', AuthHelpers.loggedIn, (req, res) => this.getMe(req, res));
        this.router.post('/logout', AuthHelpers.loggedIn, (req, res) => this.logout(req, res));
        this.router.get('/native/me', AuthHelpers.loggedInNative, (req, res) => this.getMe(req, res));
        this.router.post('/native/logout', AuthHelpers.loggedInNative, (req, res) => this.logout(req, res));
        this.router.post('/register', (req, res) => this.register(req, res));
        this.router.put('/verify', (req, res) => this.verify(req, res));
        this.router.put('/forgotten-password', (req, res) => this.forgottenPassword(req, res));
        this.router.put('/native/forgotten-password', (req, res) => this.forgottenPasswordInNative(req, res));
        this.router.put('/reset-forgotten-password', (req, res) => this.resetForgottenPassword(req, res));
        this.router.put('/verify-forgotten-password-code', (req, res) => this.verifyForgottenPasswordCode(req, res));
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
            
            if (user['verification_token_expires_on'] || user['verification_token']) {
                res.status(401).json(ErrorHandler.GenerateError(401, ErrorHandler.ErrorTypes.authentication, 'User not verified yet!'));
                return;
            }
            
            req.logIn(user, function (err) {
                if (err) {
                    res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error'));
                    return;
                }

                delete user.password;
                if(req.body.isNative){
                    const token = jwt.sign({ user_id: user.id }, process.env.AUTH_TOKEN);
                    res.json({...user, authorization: token});
                } else{
                    res.json(user);
                }
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

            if (!body.email || !body.password || !body.firstName || !body.lastName || !body.sex || !body.birthDate || !body.secretUgbPassword) {
                if (!body.email) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.bad_param, 'Email is required!'));
                    return;
                } else if (!body.password) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.bad_param, 'Password is required!'));
                    return;
                } else if (!body.firstName) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.bad_param, 'First Name is required!'));
                    return;
                } else if (!body.lastName) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.bad_param, 'Last Name is required!'));
                    return;
                } else if (!body.sex) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.bad_param, 'Sex is required!'));
                    return;
                } else if (!body.birthDate) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.bad_param, 'Birth Date is required!'));
                    return;
                } else if (!body.secretUgbPassword) {
                    res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.bad_param, 'Secret UGB password is required!'));
                    return;
                }
            } else {
                if (body.secretUgbPassword !== process.env.SECRET_UGB_PASSWORD) {
                    res.status(403).json(ErrorHandler.GenerateError(403, ErrorHandler.ErrorTypes.authentication, 'Access denied, secret UGB password is wrong!'));
                    return;
                }

                const password = bcrypt.hashSync(body.password, 10);
                let dateObj = new Date();
                let date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
                dateObj = new Date(dateObj.setDate(dateObj.getDate() + 30));
                let expirationDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`

                let userData = await MysqlAdapter.query(`
                    INSERT IGNORE INTO users (email,password,first_name,last_name,sex,created_on,verification_token_expires_on,verification_token,birth_date)
                    VALUES(
                        ${escape(body.email)},
                        '${password}',
                        ${escape(body.firstName)},
                        ${escape(body.lastName)},
                        ${escape(body.sex)},
                        '${date}',
                        '${expirationDate}',
                        uuid(),
                        ${escape(body.birthDate)}
                    )
                    RETURNING verification_token as token
                `)

                if (!userData.length) {
                    res.status(409).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.authentication, 'Failed to submit, please try again!'));
                    return;
                }

                nodeOutlook.sendEmail({
                    auth: {
                        user: process.env.OUTLOOK_NM_USERNAME,
                        pass: process.env.OUTLOOK_NM_PASSWORD,
                    },
                    from: process.env.OUTLOOK_NM_USERNAME,
                    to: body.email,
                    subject: 'Verify account',
                    html: `<p>Click <a href="${process.env.APP_HOST}/verify?token=${userData[0].token}">here</a> to verify your Gym Bud account registration</p>`,
                    onError: (e) => console.log(e),
                    onSuccess: (i) => console.log(i)
                });

                res.json({ success: true });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async verify(req, res) {
        try {
            const userData = await MysqlAdapter.query(`
                UPDATE users
                SET 
                    verification_token_expires_on = NULL,
                    verification_token=null,
                    active_status='active'
                WHERE verification_token=${escape(req.query.token)}
            `)

            if (!userData.changedRows) {
                res.status(409).json(ErrorHandler.GenerateError(404, ErrorHandler.ErrorTypes.bad_param, 'Invalid token'));
                return;
            }

            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async forgottenPassword(req, res) {
        try {
            const email = req.body.email ? escape(req.body.email) : undefined;
            if (!email) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Email not provided!'));
                return;
            }

            let dateObj = new Date(new Date().setDate(new Date().getDate() + 30));
            let expirationDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`

            const insert = await MysqlAdapter.query(`
                    UPDATE users
                    SET
                        change_password_token_expires_on='${expirationDate}',
                        change_password_token=uuid()
                    WHERE
                        email=${email}
                `);

            if (!insert.changedRows) {
                res.json({ success: true });
                return;
            }

            const token = await MysqlAdapter.query(`
                    SELECT change_password_token as token from users
                    WHERE
                        email=${email}
                `);

            const emailContent = generateVerifyRegistrationEmail(token[0].token);
            nodeOutlook.sendEmail({
                auth: {
                    user: process.env.OUTLOOK_NM_USERNAME,
                    pass: process.env.OUTLOOK_NM_PASSWORD,
                },
                from: process.env.OUTLOOK_NM_USERNAME,
                to: req.body.email,
                subject: 'Password Reset',
                html: emailContent,
                onError: (e) => console.log(e),
                onSuccess: (i) => console.log(i)
            });
            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async forgottenPasswordInNative(req, res) {
        try {
            const email = req.body.email ? escape(req.body.email) : undefined;
            if (!email) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Email not provided!'));
                return;
            }

            const dateObj = new Date(new Date().setMinutes(new Date().getMinutes() + 30));
            const expirationDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
            const shortVerificationCode = generateRandomCode(6);

            const insert = await MysqlAdapter.query(`
                    UPDATE users
                    SET
                        change_password_token_expires_on='${expirationDate}',
                        change_password_token='${shortVerificationCode}'
                    WHERE
                        email=${email}
                `);

            if (!insert.changedRows) {
                res.json({ success: true });
                return;
            }

            const emailContent = generateVerificationCodeEmail(shortVerificationCode);
            nodeOutlook.sendEmail({
                auth: {
                    user: process.env.OUTLOOK_NM_USERNAME,
                    pass: process.env.OUTLOOK_NM_PASSWORD,
                },
                from: process.env.OUTLOOK_NM_USERNAME,
                to: req.body.email,
                subject: 'Password Reset',
                html: emailContent,
                onError: (e) => console.log(e),
                onSuccess: (i) => console.log(i)
            });
            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async resetForgottenPassword(req, res) {
        try {
            const token = req.body.token ? escape(req.body.token) : undefined;
            let password = req.body.password || undefined;

            if (!token) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Token not provided!'));
                return;
            }
            if (!password) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Password not provided!'));
                return;
            }

            password = bcrypt.hashSync(password, 10);

            const email = await MysqlAdapter.query(`
                    SELECT email, id FROM users
                    WHERE
                        change_password_token=${token}
                `);
            
            if (!email.length) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Invalid token!'));
                return;
            }

            const update = await MysqlAdapter.query(`
                    UPDATE users
                    SET
                        change_password_token_expires_on=null,
                        change_password_token=null,
                        password='${password}'
                    WHERE
                        id=${email[0].id}
                `);

            if (!update.changedRows) {
                res.status(409).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.authentication, 'Failed to submit, please try again!'));
                return;
            }

            nodeOutlook.sendEmail({
                auth: {
                    user: process.env.OUTLOOK_NM_USERNAME,
                    pass: process.env.OUTLOOK_NM_PASSWORD,
                },
                from: process.env.OUTLOOK_NM_USERNAME,
                to: email[0].email,
                subject: 'Reset Password successfully',
                html: `<p>Your password was reset successfully.</p>`,
                onError: (e) => console.log(e),
                onSuccess: (i) => console.log(i)
            });
            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async verifyForgottenPasswordCode(req, res) {
        try {
            const email = req.body.email ? escape(req.body.email) : undefined;
            const code = req.body.code ? escape(req.body.code) : undefined;

            if (!email) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Token not provided!'));
                return;
            }
            if (!code) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Password not provided!'));
                return;
            }

            const result = await MysqlAdapter.query(`
                    SELECT * FROM users
                    WHERE
                        change_password_token=${code} AND email=${email}
                `);
            
            if (!result.length) {
                res.status(400).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.server_error, 'Invalid token!'));
                return;
            }

            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };
}