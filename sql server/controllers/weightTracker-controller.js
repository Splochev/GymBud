const express = require('express');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');
const ErrorHandler = require('../utils/error-handler');
const AuthHelpers = require('../utils/auth-helpers');

function parseDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

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
            const today = req.query.limitDate ? req.query.limitDate : parseDate(new Date());
            let offsetDate = req.query.offsetDate ? req.query.offsetDate : new Date();

            if (!req.query.offsetDate) {
                offsetDate.setDate(offsetDate.getDate() - 90);
                offsetDate = parseDate(offsetDate);
            }

            if (Date.parse(offsetDate) > Date.parse(today)) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, 'Invalid dates'));
                return;
            }

            const weightData = await MysqlAdapter.query(`
                SELECT * FROM 
                    weight_tracker
                WHERE
                    user_id = ${escape(user.id)}
                    AND date BETWEEN CAST(${escape(offsetDate)} AS DATE) AND CAST(${escape(today)} AS DATE)
                ORDER BY 
                    date ASC
            `);

            if (!weightData.length) {
                res.json({ data: [] })
                return;
            }

            const startDateOfWeek = new Date(weightData[0].date);
            const endDateOfWeek = new Date(weightData[0].date);
            endDateOfWeek.setDate(endDateOfWeek.getDate() + 6);

            if (weightData.length === 1) {
                res.json({
                    data: [{
                        1: weightData[0].weight,
                        2: null,
                        3: null,
                        4: null,
                        5: null,
                        6: null,
                        7: null,
                        startDate: parseDate(startDateOfWeek),
                        endDate: parseDate(endDateOfWeek),
                        avgWeight: weightData[0].weight,
                        weightChange: 0
                    }]
                });
                return;
            }

            const responseWeightData = [];
            const mappedWeightData = {};

            for (const weightEntry of weightData) {
                mappedWeightData[new Date(weightEntry.date).getTime()] = { ...weightEntry };
            }
            const mappedWeightDataKeys = Object.keys(mappedWeightData);
            const daysDifference = (new Date(today).getTime() - mappedWeightDataKeys[mappedWeightDataKeys.length - 1]) / (1000 * 3600 * 24);
            const weeksAmount = Math.ceil((mappedWeightDataKeys.length + daysDifference) / 7);

            for (let i = 0; i < weeksAmount; i++) {
                responseWeightData.push({ startDate: parseDate(startDateOfWeek), endDate: parseDate(endDateOfWeek) });
                let weightSum = 0;
                let avgWeightCounter = 0;
                let dateCounter = 1;
                while (startDateOfWeek.getTime() <= endDateOfWeek.getTime()) {
                    const startDateOfWeekAsTime = startDateOfWeek.getTime();
                    if (mappedWeightData[startDateOfWeekAsTime]) {
                        responseWeightData[i][dateCounter] = mappedWeightData[startDateOfWeekAsTime].weight;
                        weightSum += mappedWeightData[startDateOfWeekAsTime].weight;
                        avgWeightCounter++;
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

            if (req.query.getMinOffsetDate) {
                const minOffsetDate = await MysqlAdapter.query(`
                    SELECT date FROM 
                        weight_tracker
                    WHERE
                        user_id = ${escape(user.id)}
                    ORDER BY 
                        date ASC
                    limit 1; 
                `);

                res.json({ data: responseWeightData, minOffsetDate: minOffsetDate[0].date });
            } else {
                res.json({ data: responseWeightData });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };


    async submitWeight(req, res) {
        try {
            const user = req.user;
            const weight = escape(req.body.weight);
            const date = req.body.date;

            const weightData = await MysqlAdapter.query(`
                INSERT INTO weight_tracker (user_id,weight,date)
                    values (${escape(user.id)},${weight},${escape(date)})
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