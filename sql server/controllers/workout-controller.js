const express = require('express');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');
const ErrorHandler = require('../utils/error-handler');
const AuthHelpers = require('../utils/auth-helpers');

module.exports = class WorkoutController {
    constructor() {
        this.router = express.Router();
        this.attachEndpoints();
    }
    attachEndpoints() {
        this.router.post('/add-workout-journal', AuthHelpers.loggedIn, (req, res) => this.addWorkoutJournal(req, res));
        this.router.get('/get-workout-journals', AuthHelpers.loggedIn, (req, res) => this.getWorkoutJournals(req, res));

        this.router.post('/add-workout-journal-session', AuthHelpers.loggedIn, (req, res) => this.addWorkoutJournalSession(req, res));
        this.router.get('/get-workout-journal-sessions', AuthHelpers.loggedIn, (req, res) => this.getWorkoutJournalSessions(req, res));

        this.router.post('/add-exercise', AuthHelpers.loggedIn, (req, res) => this.addExercise(req, res));
        this.router.get('/get-exercises', AuthHelpers.loggedIn, (req, res) => this.getExercises(req, res));
    }

    async addWorkoutJournal(req, res) {
        try {
            const user = req.user;
            const description = req.body.description;
            const name = req.body.name;

            if (!name || !user) {
                let invalidParam = ''
                if (!name) {
                    invalidParam = 'name'
                } else if (!user) {
                    invalidParam = 'user'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            try {
                await MysqlAdapter.query(`
                    INSERT INTO workouts (user_id,name,description)
                        VALUES (
                            ${escape(user.id)},
                            ${escape(name)},
                            ${description ? escape(description) : "NULL"}
                        )
                 `);
            } catch (err) {
                console.log(err)
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.conflict, 'A workout journal with that name already exists!'));
                return;
            }

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getWorkoutJournals(req, res) {
        try {
            const user = req.user;
            const filter = req.query.filter ? req.query.filter.replace(/'/g, "\\'") : undefined;
            const offset = req.query.offset;
            const limit = req.query.limit;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }

            let filterQuery = undefined;
            if (filter) {
                filterQuery = `AND w.name LIKE ${escape(`%${filter}%`)}`;
            }

            let limitQuery = undefined;
            if (offset && limit) {
                limitQuery = `LIMIT ${escape(offset)},${escape(limit)}`;
            }

            const workoutJournals = await MysqlAdapter.query(`
                SELECT
                    *
                FROM workouts w
                WHERE
                    w.user_id = ${escape(user.id)}
                ${filterQuery ? filterQuery : ''}
                ${limitQuery ? limitQuery : ''}
            `);

            res.json({ data: workoutJournals });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async addWorkoutJournalSession(req, res) {
        try {
            const user = req.user;
            const name = req.body.name;
            const workoutJournalId = req.body.workoutJournalId;

            if (!name || !user || !workoutJournalId) {
                let invalidParam = ''
                if (!name) {
                    invalidParam = 'name'
                } else if (!user) {
                    invalidParam = 'user'
                } else if (!workoutJournalId) {
                    invalidParam = 'workout journal'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            try {
                await MysqlAdapter.query(`
                    INSERT INTO daily_workout (user_id,name,workouts_id)
                        VALUES (
                            ${escape(user.id)},
                            ${escape(name)},
                            ${escape(workoutJournalId)}
                        )
                 `);
            } catch (err) {
                console.log(err)
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.conflict, 'A workout journal with that name already exists!'));
                return;
            }

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getWorkoutJournalSessions(req, res) {
        try {
            const user = req.user;
            const filter = req.query.filter ? req.query.filter.replace(/'/g, "\\'") : undefined;
            const offset = req.query.offset;
            const limit = req.query.limit;

            if (!filter || !user) {
                let invalidParam = '';
                if (!filter) {
                    invalidParam = 'filter';
                } else if (!user) {
                    invalidParam = 'user';
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            let limitQuery = undefined;
            if (offset && limit) {
                limitQuery = `LIMIT ${escape(req.query.offset)},${escape(req.query.offset)}`
            }

            const workoutJournalSession = await MysqlAdapter.query(`
                SELECT
                    *
                FROM daily_workout dw
                WHERE
                    dw.user_id = ${escape(user.id)}
                AND dw.workouts_id LIKE ${escape(`%${filter}%`)}
                ${limitQuery ? limitQuery : ''}
            `);

            res.json({ data: workoutJournalSession });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async addExercise(req, res) {
        try {
            const user = req.user;
            const exercise = req.body.exercise;
            const videoUrl = req.body.videoUrl;

            if (!exercise || !user) {
                let invalidParam = ''
                if (!exercise) {
                    invalidParam = 'exercise'
                } else if (!user) {
                    invalidParam = 'user'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            try {
                await MysqlAdapter.query(`
                    INSERT INTO exercises (user_id,exercise,video_url)
                        VALUES (
                            ${escape(user.id)},
                            ${escape(exercise)},
                            ${videoUrl ? escape(videoUrl) : "NULL"}
                        )
                 `);
            } catch (err) {
                console.log(err)
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.conflict, 'This exercise already exists!'));
                return;
            }

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getExercises(req, res) {
        try {
            const user = req.user;
            const filter = req.query.filter ? req.query.filter.replace(/'/g, "\\'") : undefined;
            const offset = req.query.offset;
            const limit = req.query.limit;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }

            let filterQuery = undefined;
            if (filter) {
                filterQuery = `AND e.exercise LIKE ${escape(`%${filter}%`)}`
            }

            let limitQuery = undefined;
            if (offset && limit) {
                limitQuery = `LIMIT ${escape(offset)},${escape(limit)}`
            }

            const exercises = await MysqlAdapter.query(`
                SELECT
                    id,
                    exercise,
                    video_url as videoLink
                FROM exercises e
                WHERE
                    (e.user_id = ${escape(user.id)}
                    OR e.isPublic = '1')
                ${filterQuery ? filterQuery : ''}
                ${limitQuery ? limitQuery : ''}
            `);

            res.json({ data: exercises });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

}