const express = require('express');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');
const ErrorHandler = require('../utils/error-handler');
const AuthHelpers = require('../utils/auth-helpers');

function parseDate(date) {
    const month = date.getMonth() + 1
    const dateOfMonth = date.getDate();

    return `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${dateOfMonth < 10 ? `0${dateOfMonth}` : dateOfMonth}`
}

function getTime(dateInput) {
    const month = (dateInput.getMonth() + 1) * 2629743;
    const year = dateInput.getFullYear() * 31556926;
    const date = dateInput.getDate() * 86400;
    return year + month + date;
}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}

function yearIsLeap(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const daysInMonths = {
    1: 31,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
};

const quartersDateRange = {
    1: ['-01-01', '-03-31'],
    2: ['-04-01', '-06-30'],
    3: ['-07-01', '-09-30'],
    4: ['-10-01', '-12-31']
}

module.exports = class WeightTrackerController {
    constructor() {
        this.router = express.Router();
        this.attachEndpoints();
    }
    attachEndpoints() {
        this.router.get('/get-weight-chart-data-by-year', AuthHelpers.loggedIn, (req, res) => this.getWeightChartDataByYear(req, res));
        this.router.get('/get-weight-chart-data-by-quarter', AuthHelpers.loggedIn, (req, res) => this.getWeightChartDataByQuarter(req, res));
        this.router.get('/get-weight-chart-data-by-month', AuthHelpers.loggedIn, (req, res) => this.getWeightChartDataByMonth(req, res));
        this.router.get('/get-weight-chart-data-by-week', AuthHelpers.loggedIn, (req, res) => this.getWeightChartDataByWeek(req, res));
        this.router.get('/get-weight-data', AuthHelpers.loggedIn, (req, res) => this.getWeightData(req, res));
        this.router.get('/get-avg-weight-for-last-7-days', AuthHelpers.loggedIn, (req, res) => this.getWeightDataForLast7Days(req, res));
        this.router.post('/submit-weight', AuthHelpers.loggedIn, (req, res) => this.submitWeight(req, res));
        this.router.put('/edit-weights', AuthHelpers.loggedIn, (req, res) => this.editWeights(req, res));
        this.router.delete('/delete-weight-entries', AuthHelpers.loggedIn, (req, res) => this.deleteWeightEntries(req, res));
    }

    async getWeightChartDataByYear(req, res) {
        try {
            const user = req.user;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }

            const weightDataByYear = await MysqlAdapter.query(`
                SELECT 
                    YEAR(\`date\`) AS \`year\`,
                    AVG(weight) as avgWeight
                FROM 
                    weight_tracker
                WHERE 
                    user_id = ${escape(user.id)}
                GROUP BY
                    \`year\`
                ORDER BY
                    \`date\`
            `);

            for (let i = 0; i < weightDataByYear.length; i++) {
                weightDataByYear[i].avgWeight = Math.round((weightDataByYear[i].avgWeight + Number.EPSILON) * 100) / 100;
                weightDataByYear[i].startDate = weightDataByYear[i].year + '-01-01'
                weightDataByYear[i].endDate = weightDataByYear[i].year + '-12-31'

                if (i === 0) {
                    weightDataByYear[i].weightChange = 0;
                } else {
                    if (weightDataByYear[i].avgWeight) {
                        let result = Math.round(((weightDataByYear[i].avgWeight - weightDataByYear[i - 1].avgWeight) / weightDataByYear[i - 1].avgWeight * 100) * 100) / 100;
                        if (isNaN(result) || result == 'Infinity' || result == '-Infinity') {
                            result = 0;
                        }
                        weightDataByYear[i].weightChange = result;
                    } else {
                        weightDataByYear[i].weightChange = 0
                    }
                }
            }

            res.json({ data: weightDataByYear });
        } catch (error) {
            console.log(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getWeightChartDataByQuarter(req, res) {
        try {
            const user = req.user;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }

            const weightDataByQuarter = await MysqlAdapter.query(`
                SELECT 
                    YEAR(\`date\`) AS \`year\`,
                    QUARTER(\`date\`) AS \`quarter\`,
                    AVG(weight) as avgWeight
                FROM 
                    weight_tracker
                WHERE 
                    user_id = ${escape(user.id)}
                GROUP BY
                    \`year\`,\`quarter\`
                ORDER BY
                    \`date\`
            `);

            for (let i = 0; i < weightDataByQuarter.length; i++) {
                weightDataByQuarter[i].avgWeight = Math.round((weightDataByQuarter[i].avgWeight + Number.EPSILON) * 100) / 100;
                weightDataByQuarter[i].startDate = weightDataByQuarter[i].year + quartersDateRange[weightDataByQuarter[i].quarter][0];
                weightDataByQuarter[i].endDate = weightDataByQuarter[i].year + quartersDateRange[weightDataByQuarter[i].quarter][1];

                if (i === 0) {
                    weightDataByQuarter[i].weightChange = 0;
                } else {
                    if (weightDataByQuarter[i].avgWeight) {
                        let result = Math.round(((weightDataByQuarter[i].avgWeight - weightDataByQuarter[i - 1].avgWeight) / weightDataByQuarter[i - 1].avgWeight * 100) * 100) / 100;
                        if (isNaN(result) || result == 'Infinity' || result == '-Infinity') {
                            result = 0;
                        }
                        weightDataByQuarter[i].weightChange = result;
                    } else {
                        weightDataByQuarter[i].weightChange = 0
                    }
                }
            }

            res.json({ data: weightDataByQuarter });
        } catch (error) {
            console.log(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getWeightChartDataByMonth(req, res) {
        try {
            const user = req.user;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }

            const weightDataByMonth = await MysqlAdapter.query(`
                SELECT 
                    YEAR(\`date\`) AS \`year\`, 
                    MONTH(\`date\`) AS \`month\`,
                    AVG(weight) AS avgWeight 
                FROM 
                    weight_tracker
                WHERE 
                    user_id = ${escape(user.id)}
                GROUP BY
                    \`month\`, \`year\`
                ORDER BY 
                    \`date\`
            `);

            for (let i = 0; i < weightDataByMonth.length; i++) {
                weightDataByMonth[i].avgWeight = Math.round((weightDataByMonth[i].avgWeight + Number.EPSILON) * 100) / 100;
                const year = weightDataByMonth[i].year;
                const month = weightDataByMonth[i].month;
                const days = month === 2 ?
                    yearIsLeap(year) ? 29 : 28
                    :
                    daysInMonths[month]

                weightDataByMonth[i].startDate = `${year}-${month < 10 ? `0${month}` : month}-01`;
                weightDataByMonth[i].endDate = `${year}-${month < 10 ? `0${month}` : month}-${days}`;

                if (i === 0) {
                    weightDataByMonth[i].weightChange = 0;
                } else {
                    if (weightDataByMonth[i].avgWeight) {
                        let result = Math.round(((weightDataByMonth[i].avgWeight - weightDataByMonth[i - 1].avgWeight) / weightDataByMonth[i - 1].avgWeight * 100) * 100) / 100;
                        if (isNaN(result) || result == 'Infinity' || result == '-Infinity') {
                            result = 0;
                        }
                        weightDataByMonth[i].weightChange = result;
                    } else {
                        weightDataByMonth[i].weightChange = 0
                    }
                }
            }

            res.json({ data: weightDataByMonth });
        } catch (error) {
            console.log(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getWeightChartDataByWeek(req, res) {
        const user = req.user;
        // const offsetDate = req.query.offsetDate;
        // const limitDate = req.query.limitDate;
        // const parsedOffsetDate = new Date(offsetDate);
        // const parsedLimitDate = new Date(limitDate);

        if (!user) {
            res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
            return;
        }
        // if (!offsetDate || isNaN(parsedOffsetDate.getTime())) {
        //     res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, 'Start date for date range required'));
        //     return;
        // }
        // if (!limitDate || isNaN(parsedLimitDate.getTime())) {
        //     res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, 'End date for date range required'));
        //     return;
        // }

        try {
            // const experimental = await MysqlAdapter.query(`
            //     SELECT 
            //         WEEK(\`date\`,5) AS \`week\`,
            //         YEAR(\`date\`) AS \`year\`, 
            //         AVG(weight) AS avgWeight 
            //     FROM 
            //         weight_tracker
            //     WHERE 
            //         user_id = ${escape(user.id)}
            //         AND date BETWEEN CAST(${escape(offsetDate)} AS DATE) AND CAST(${escape(limitDate)} AS DATE)
            //     GROUP BY
            //         \`year\`, \`week\`
            //     ORDER BY
            //         \`date\`
            // `);

            const weightDataByWeek = await MysqlAdapter.query(`
                SELECT 
                    WEEK(\`date\`,5) AS \`week\`,
                    YEAR(\`date\`) AS \`year\`, 
                    AVG(weight) AS avgWeight 
                FROM 
                    weight_tracker
                WHERE 
                    user_id = ${escape(user.id)}
                GROUP BY
                    \`year\`, \`week\`
                ORDER BY
                    \`date\`
            `);

            for (let i = 0; i < weightDataByWeek.length; i++) {
                weightDataByWeek[i].avgWeight = Math.round((weightDataByWeek[i].avgWeight + Number.EPSILON) * 100) / 100;
                weightDataByWeek[i].startDate = getDateOfISOWeek(weightDataByWeek[i].week, weightDataByWeek[i].year);
                weightDataByWeek[i].endDate = new Date(weightDataByWeek[i].startDate);
                weightDataByWeek[i].endDate.setDate(weightDataByWeek[i].endDate.getDate() + 6);
                weightDataByWeek[i].startDate = parseDate(weightDataByWeek[i].startDate);
                weightDataByWeek[i].endDate = parseDate(weightDataByWeek[i].endDate);

                if (i === 0) {
                    weightDataByWeek[i].weightChange = 0;
                } else {
                    if (weightDataByWeek[i].avgWeight) {
                        let result = Math.round(((weightDataByWeek[i].avgWeight - weightDataByWeek[i - 1].avgWeight) / weightDataByWeek[i - 1].avgWeight * 100) * 100) / 100;
                        if (isNaN(result) || result == 'Infinity' || result == '-Infinity') {
                            result = 0;
                        }
                        weightDataByWeek[i].weightChange = result;
                    } else {
                        weightDataByWeek[i].weightChange = 0
                    }
                }
            }

            res.json({ data: weightDataByWeek });
        } catch (error) {
            console.log(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getWeightData(req, res) {
        try {
            const user = req.user;
            const offsetDate = req.query.offsetDate;
            const limitDate = req.query.limitDate;
            const parsedOffsetDate = new Date(offsetDate);
            const parsedLimitDate = new Date(limitDate);
            const daysDifference = Math.floor((parsedLimitDate.getTime() - parsedOffsetDate.getTime()) / 86400000);

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }
            if (!offsetDate || isNaN(parsedOffsetDate.getTime())) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, 'Start date for date range required'));
                return;
            }
            if (!limitDate || isNaN(parsedLimitDate.getTime())) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, 'End date for date range required'));
                return;
            }
            if (daysDifference > 183) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, 'Date range should not be bigger than 6 months.'));
                return;
            }

            const weightData = await MysqlAdapter.query(`
                SELECT date, weight FROM 
                    weight_tracker
                WHERE
                    user_id = ${escape(user.id)}
                    AND date BETWEEN CAST(${escape(offsetDate)} AS DATE) AND CAST(${escape(limitDate)} AS DATE)
                ORDER BY 
                    date ASC
            `);

            if (!weightData.length) {
                res.json({ data: [] });
                return;
            }

            const dateIteratorArr = getWeekNumber(weightData[0].date);
            let dateIterator = getDateOfISOWeek(dateIteratorArr[1], dateIteratorArr[0]);
            const endDateAsTime = getTime(weightData[weightData.length - 1].date);
            const mappedWeightData = {};

            while (getTime(dateIterator) <= endDateAsTime) {
                mappedWeightData[getTime(dateIterator)] = true;
                dateIterator.setDate(dateIterator.getDate() + 1);
            }

            for (const weightEntry of weightData) {
                const weightEntryDate = weightEntry.date;
                mappedWeightData[getTime(weightEntryDate)] = { ...weightEntry };
            }

            const weeksAmount = Math.ceil(Object.keys(mappedWeightData).length / 7);
            dateIterator = getDateOfISOWeek(dateIteratorArr[1], dateIteratorArr[0]);
            const endDateOfWeek = new Date(dateIterator);
            endDateOfWeek.setDate(endDateOfWeek.getDate() + 6);
            const responseWeightData = [];
            const parsedLimitDateAsTime = getTime(parsedLimitDate);

            for (let i = 0; i < weeksAmount; i++) {
                responseWeightData.push({ startDate: parseDate(dateIterator), endDate: parseDate(endDateOfWeek) });
                let weightSum = 0;
                let avgWeightCounter = 0;
                let dateCounter = 1;

                while (getTime(dateIterator) <= getTime(endDateOfWeek) && getTime(dateIterator) <= parsedLimitDateAsTime) {
                    const dateIteratorAsTime = getTime(dateIterator);
                    if (mappedWeightData[dateIteratorAsTime]) {
                        const weight = mappedWeightData[dateIteratorAsTime].weight;
                        responseWeightData[i][dateCounter] = weight;
                        if (!isNaN(Number(weight))) {
                            weightSum += weight;
                            avgWeightCounter++;
                        } else {
                            responseWeightData[i][dateCounter] = null
                        }
                    }
                    dateCounter++;
                    dateIterator.setDate(dateIterator.getDate() + 1);
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

            for (let i = 1; i <= 7; i++) {
                if (responseWeightData[0][i]) {
                    break;
                }
                delete responseWeightData[0][i];
            }

            res.json({ data: responseWeightData });
        } catch (error) {
            console.log(error);
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getWeightDataForLast7Days(req, res) {
        try {
            const user = req.user;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }

            const recent7DaysLimit = new Date();
            const recent7DaysOffset = new Date();
            recent7DaysOffset.setDate(recent7DaysOffset.getDate() - 6);
            const preRecent7DaysLimit = new Date();
            preRecent7DaysLimit.setDate(preRecent7DaysLimit.getDate() - 7);
            const preRecent7DaysOffset = new Date();
            preRecent7DaysOffset.setDate(preRecent7DaysOffset.getDate() - 13);

            const recent7DaysData = await MysqlAdapter.query(`
                SELECT 
                    AVG(weight) AS avgWeight 
                FROM 
                    weight_tracker
                WHERE 
                    user_id = ${escape(user.id)}
                    AND \`date\` BETWEEN
                        CAST(${escape(parseDate(recent7DaysOffset))} AS DATE)
                        AND
                        CAST(${escape(parseDate(recent7DaysLimit))} AS DATE)
            `);

            const preRecent7DaysData = await MysqlAdapter.query(`
                SELECT 
                    AVG(weight) AS avgWeight 
                FROM 
                    weight_tracker
                WHERE 
                    user_id = ${escape(user.id)}
                    AND \`date\` BETWEEN
                        CAST(${escape(parseDate(preRecent7DaysLimit))} AS DATE)
                        AND
                        CAST(${escape(parseDate(preRecent7DaysLimit))} AS DATE)
            `);

            const sevenDaysData = [preRecent7DaysData[0], recent7DaysData[0]];

            for (let i = 0; i < sevenDaysData.length; i++) {
                if (i === 0) {
                    sevenDaysData[i].weightChange = 0;
                } else {
                    if (sevenDaysData[i].avgWeight) {
                        let result = Math.round(((sevenDaysData[i].avgWeight - sevenDaysData[i - 1].avgWeight) / sevenDaysData[i - 1].avgWeight * 100) * 100) / 100;
                        if (isNaN(result) || result == 'Infinity' || result == '-Infinity') {
                            result = 0;
                        }
                        sevenDaysData[i].weightChange = result;
                    } else {
                        sevenDaysData[i].weightChange = 0;
                    }
                }
            }

            if (!sevenDaysData[1].avgWeight) {
                sevenDaysData[1].avgWeight = 0;
            }

            if (!sevenDaysData[1].weightChange) {
                sevenDaysData[1].weightChange = 0;
            }

            res.json(sevenDaysData[1]);
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

    async editWeights(req, res) {
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

    async deleteWeightEntries(req, res) {
        try {
            const user = req.user;
            const deletedWeightData = await MysqlAdapter.query(`
                DELETE FROM 
                    weight_tracker
                WHERE
                    user_id=${escape(user.id)}
            `);

            res.json({deletedWeightData: deletedWeightData});
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

}