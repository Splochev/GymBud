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
        this.router.get('/get-weight-data', AuthHelpers.loggedIn, (req, res) => this.getWeightData(req, res));
        this.router.post('/submit-weight', AuthHelpers.loggedIn, (req, res) => this.submitWeight(req, res));

    }

    async getWeightData(req, res) {
        try {
            const user = req.user;
            const today = new Date('2022-05-04');
            let offsetDate = req.query.offsetDate ? new Date(req.query.offsetDate) : new Date();

            if (!req.query.offsetDate) {
                offsetDate.setDate(offsetDate.getDate() - 90);
            }

            const weightData = await MysqlAdapter.query(`
                SELECT * FROM 
                    weight_tracker
                WHERE
                    user_id = ${escape(user.id)}
                    AND date BETWEEN ${escape(offsetDate.toISOString().split('T')[0])} AND ${escape(today.toISOString().split('T')[0])}
                ORDER BY 
                    date ASC
            `);

            if (!weightData.length) {
                res.status(409).json(ErrorHandler.GenerateError(400, ErrorHandler.ErrorTypes.authentication, 'Failed to submit, please try again!'));
                return;
            }

            const responseWeightData = [];
            const mappedWeightData = {};
            
            for (const weightEntry of weightData) {
                mappedWeightData[new Date(weightEntry.date).getTime()] = { ...weightEntry };
            }
            
            const weeksAmount = Math.ceil((Math.ceil((Math.abs(today - new Date(weightData[0].date))) / (1000 * 60 * 60 * 24))) / 7);
            const startDateOfWeek = new Date(weightData[0].date);
            const endDateOfWeek = new Date(weightData[0].date);
            endDateOfWeek.setDate(endDateOfWeek.getDate() + 6);

            for (let i = 0; i < weeksAmount; i++) {
                responseWeightData.push({ startDate: startDateOfWeek.toISOString().split('T')[0], endDate: endDateOfWeek.toISOString().split('T')[0] });
                let weightSum = 0;
                let avgWeightCounter = 0;
                let dateCounter = 1;
                while (startDateOfWeek.getTime() <= endDateOfWeek.getTime()) {
                    const startDateOfWeekAsTime = startDateOfWeek.getTime();
                    if (mappedWeightData[startDateOfWeekAsTime]) {
                        responseWeightData[i][dateCounter] = mappedWeightData[startDateOfWeekAsTime].weight;
                        weightSum += mappedWeightData[startDateOfWeekAsTime].weight;
                        ++avgWeightCounter;
                    } else {
                        responseWeightData[i][dateCounter] = null;
                    }
                    dateCounter++;
                    startDateOfWeek.setDate(startDateOfWeek.getDate() + 1);
                }

                responseWeightData[i].avgWeight = (weightSum / avgWeightCounter).toFixed(2);
                if (isNaN(responseWeightData[i].avgWeight)) {
                    responseWeightData[i].avgWeight = 0;
                }

                if (i === 0) {
                    responseWeightData[i].weightChange = 0;
                } else {
                    responseWeightData[i].weightChange = !responseWeightData[i].avgWeight ? 0 : Math.round(((responseWeightData[i].avgWeight - responseWeightData[i - 1].avgWeight) / responseWeightData[i - 1].avgWeight * 100) * 100) / 100;
                }
                endDateOfWeek.setDate(endDateOfWeek.getDate() + 7);
            }

            res.json({ data: responseWeightData });
        } catch (error) {
            console.log(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };


    async submitWeight(req, res) {
        try {
            const user = req.user;
            const weight = escape(req.body.weight);
            const date = escape(req.body.date);

            const weightData = await MysqlAdapter.query(`
                INSERT INTO weight_tracker (user_id,weight,date)
                    values (${escape(user.id)},${weight},${date})
                ON DUPLICATE KEY UPDATE
                    user_id = VALUES(user_id),
                    weight = VALUES(weight),
                    date = VALUES(date)
            `);

            res.json({ data: weightData });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };


}