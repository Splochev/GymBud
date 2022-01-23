const express = require('express');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');
const ErrorHandler = require('../utils/error-handler');
const AuthHelpers = require('../utils/auth-helpers');

module.exports = class WeightTrackerController {
    constructor() {
        this.router = express.Router();
        this.attachEndpoints();
    }
    attachEndpoints() {
        this.router.get('/get-weight-data', AuthHelpers.loggedIn,(req, res) => this.getWeightData(req, res));
    }

    async getWeightData(req, res) {
        try {
            const user = req.user;
            const weightData = await MysqlAdapter.query(`
                SELECT *
                FROM weight_tracker
                WHERE user_id = ${escape(user.id)};
            `);

            res.json({ data: weightData });
        } catch (error) {
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

}