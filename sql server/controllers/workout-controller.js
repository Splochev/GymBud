const express = require('express');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');
const ErrorHandler = require('../utils/error-handler');
const AuthHelpers = require('../utils/auth-helpers');

function parseDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

module.exports = class WorkoutController {
    constructor() {
        this.router = express.Router();
        this.attachEndpoints();
    }
    attachEndpoints() {
        this.router.get('/get-weight-data', AuthHelpers.loggedIn, (req, res) => this.getWeightData(req, res));

        this.router.get('/get-weight-data', AuthHelpers.loggedIn, (req, res) => this.getWeightData(req, res));
        this.router.post('/submit-weight', AuthHelpers.loggedIn, (req, res) => this.submitWeight(req, res));
        this.router.put('/edit-weights', AuthHelpers.loggedIn, (req, res) => this.submitWeights(req, res));
    }

    async getWeightData(req, res) {
        try {
            const user = req.user;
            const limit = req.query.limitDate ? req.query.limitDate : parseDate(new Date());
            const minSelectedOffsetDateIsSet = req.query.getMinOffsetDate;
            let offsetDate = req.query.offsetDate ? req.query.offsetDate : new Date();

            if (!req.query.offsetDate) {
                offsetDate.setDate(offsetDate.getDate() - 90);
                offsetDate = parseDate(offsetDate);
            }
            if (new Date(offsetDate).getTime() > new Date(limit).getTime()) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, 'Invalid dates'));
                return;
            }

            const weightData = await MysqlAdapter.query(`
                SELECT date, weight FROM 
                    weight_tracker
                WHERE
                    user_id = ${escape(user.id)}
                    AND date BETWEEN CAST(${escape(offsetDate)} AS DATE) AND CAST(${escape(limit)} AS DATE)
                ORDER BY 
                    date ASC
            `);

            if (!weightData.length) {
                res.json({ data: [] });
                return;
            }

            let minOffsetDate = await MysqlAdapter.query(`
                SELECT date FROM 
                    weight_tracker
                WHERE
                    user_id = ${escape(user.id)}
                ORDER BY 
                    date ASC
                limit 1; 
            `)
            minOffsetDate = minOffsetDate[0].date

            const mappedWeightData = {};
            let startDateOfWeek = !minSelectedOffsetDateIsSet && new Date(minOffsetDate).getTime() < new Date(offsetDate).getTime() ? new Date(offsetDate) : new Date(weightData[0].date);
            const parsedLimit = new Date(limit).getTime();

            while (startDateOfWeek.getTime() <= parsedLimit) {
                mappedWeightData[startDateOfWeek.getTime()] = 1;
                startDateOfWeek.setDate(startDateOfWeek.getDate() + 1);
            }

            for (const weightEntry of weightData) {
                mappedWeightData[new Date(weightEntry.date).getTime()] = { ...weightEntry };
            }

            const weeksAmount = Math.ceil(Object.keys(mappedWeightData).length / 7);
            startDateOfWeek = !minSelectedOffsetDateIsSet && new Date(minOffsetDate).getTime() < new Date(offsetDate).getTime() ? new Date(offsetDate) : new Date(weightData[0].date);
            const endDateOfWeek = !minSelectedOffsetDateIsSet && new Date(minOffsetDate).getTime() < new Date(offsetDate).getTime() ? new Date(offsetDate) : new Date(weightData[0].date);
            endDateOfWeek.setDate(endDateOfWeek.getDate() + 6);
            const responseWeightData = [];

            for (let i = 0; i < weeksAmount; i++) {
                responseWeightData.push({ startDate: parseDate(startDateOfWeek), endDate: parseDate(endDateOfWeek) });
                let weightSum = 0;
                let avgWeightCounter = 0;
                let dateCounter = 1;

                while (startDateOfWeek.getTime() <= endDateOfWeek.getTime()) {
                    const startDateOfWeekAsTime = startDateOfWeek.getTime();
                    if (mappedWeightData[startDateOfWeekAsTime] && mappedWeightData[startDateOfWeekAsTime] !== 1) {
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
                    if (responseWeightData[i].avgWeight) {
                        let result = Math.round(((responseWeightData[i].avgWeight - responseWeightData[i - 1].avgWeight) / responseWeightData[i - 1].avgWeight * 100) * 100) / 100;
                        if (isNaN(result) || result == 'Infinity' || result == '-Infinity') {
                            result = 0;
                        }
                        responseWeightData[i].weightChange = result;
                    } else {
                        responseWeightData[i].weightChange = 0
                    }
                }
                endDateOfWeek.setDate(endDateOfWeek.getDate() + 7);
            }

            res.json({ data: responseWeightData, minOffsetDate: minOffsetDate });
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
                    VALUES (${escape(user.id)},${weight},${escape(date)})
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

    async submitWeights(req, res) {
        try {
            const user = req.user;
            const weightEntries = Object.entries(req.body);
            const forDeletionEntries = [];
            const forUpdateEntries = [];

            for (const entry of weightEntries) {
                if (entry[1] === null) {
                    forDeletionEntries.push(escape(entry[0]));
                } else {
                    forUpdateEntries.push(entry);
                }
            }

            let deletedWeightData = 0;
            if (forDeletionEntries.length > 0) {
                deletedWeightData = await MysqlAdapter.query(`
                    DELETE FROM 
                        weight_tracker
                    WHERE
                        user_id=${escape(user.id)} 
                            AND
                        date IN (${forDeletionEntries.join(',')})
                `);
            }

            let weightData = 0;
            if (forUpdateEntries.length > 0) {
                weightData = await MysqlAdapter.query(`
                    INSERT INTO weight_tracker (user_id,weight,date)
                        VALUES ${forUpdateEntries.map(entry => `(${escape(user.id)},${escape(entry[1])},${escape(entry[0])})`)}
                    ON DUPLICATE KEY UPDATE
                        user_id = VALUES(user_id),
                        weight = VALUES(weight),
                        date = VALUES(date)
                `);
            }

            res.json({ updatedData: weightData, deletedWeightData: deletedWeightData });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }


    };



    
}