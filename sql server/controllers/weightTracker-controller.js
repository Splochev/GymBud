const express = require('express');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');

module.exports = class WeightTrackerController {
    constructor() {
        this.router = express.Router();
        this.attachEndpoints();
    }
    attachEndpoints() {
        this.router.get('/get-weight-data', (req, res) => this.getWeightData(req, res));
    }

    async getWeightData(req, res) {
        try {

            let weightData = await MysqlAdapter.query(`
                SELECT *
                FROM weight_tracker;
            `);

            res.json({ data: weightData });
            
        } catch (error) {
            console.error(error);
            // res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

}