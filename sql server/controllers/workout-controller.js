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
        this.router.put('/edit-workout-journal', AuthHelpers.loggedIn, (req, res) => this.editWorkoutJournal(req, res));
        this.router.get('/get-workout-journals', AuthHelpers.loggedIn, (req, res) => this.getWorkoutJournals(req, res));
        this.router.delete('/delete-workout-journal', AuthHelpers.loggedIn, (req, res) => this.deleteWorkoutJournals(req, res));

        this.router.post('/add-workout-journal-session', AuthHelpers.loggedIn, (req, res) => this.addWorkoutJournalSession(req, res));
        this.router.put('/edit-workout-journal-session', AuthHelpers.loggedIn, (req, res) => this.editWorkoutJournalSession(req, res));
        this.router.get('/get-workout-journal-sessions', AuthHelpers.loggedIn, (req, res) => this.getWorkoutJournalSessions(req, res));
        this.router.delete('/delete-workout-journal-session', AuthHelpers.loggedIn, (req, res) => this.deleteWorkoutJournalSession(req, res));

        this.router.post('/add-exercise', AuthHelpers.loggedIn, (req, res) => this.addExercise(req, res));
        this.router.get('/get-exercises', AuthHelpers.loggedIn, (req, res) => this.getExercises(req, res));
        this.router.get('/get-workout-journal-session-exercises', AuthHelpers.loggedIn, (req, res) => this.getWorkoutJournalSessionExercises(req, res));
        this.router.post('/add-workout-journal-session-exercises', AuthHelpers.loggedIn, (req, res) => this.addWorkoutJournalSessionExercises(req, res));
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

    async editWorkoutJournal(req, res) {
        try {
            const user = req.user;
            const id = req.body.id;
            const description = req.body.description;
            const name = req.body.name;

            if (!user || !id) {
                let invalidParam = ''
                if (!user) {
                    invalidParam = 'user'
                } else if (!id) {
                    invalidParam = 'id'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            const existingWJ = await MysqlAdapter.query(`
                SELECT name FROM workouts
                WHERE
                    user_id = ${escape(user.id)}
                    AND name = ${escape(name)}
            `);

            if (existingWJ.length) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Duplicate workout journals not allowed`));
                return;
            }

            let edits = '';
            if (name && !description) {
                edits = `name=${escape(name)}`
            } else if (description && !name) {
                edits = `description=${escape(description)}`
            } else if (description && name) {
                edits = `name=${escape(name)}, description=${escape(description)}`
            }

            if (!edits) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `No edit options`));
                return;
            }

            const editWJ = await MysqlAdapter.query(`
                UPDATE workouts
                SET ${edits}
                WHERE
                    user_id = ${escape(user.id)}
                    AND id= ${escape(id)}
            `);

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async deleteWorkoutJournals(req, res) {
        try {
            const user = req.user;
            const id = req.body.id;

            if (!user || !id) {
                let invalidParam = ''
                if (!user) {
                    invalidParam = 'user'
                } else if (!id) {
                    invalidParam = 'id'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            const deleteWJ = await MysqlAdapter.query(`
                DELETE FROM workouts
                WHERE
                    user_id = ${escape(user.id)}
                    AND id= ${escape(id)}
            `);

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

    async editWorkoutJournalSession(req, res) {
        try {
            const user = req.user;
            const id = req.body.id;
            const workoutJournalId = req.body.workoutJournalId;
            const name = req.body.name;

            if (!user || !id || !workoutJournalId) {
                let invalidParam = ''
                if (!user) {
                    invalidParam = 'user'
                } else if (!id) {
                    invalidParam = 'workout session id'
                } else if (!workoutJournalId) {
                    invalidParam = 'workout journal id'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            const existingWS = await MysqlAdapter.query(`
                SELECT name FROM daily_workout
                WHERE
                    user_id = ${escape(user.id)}
                    AND workouts_id = ${escape(workoutJournalId)}
                    AND name = ${escape(name)}
            `);

            if (existingWS.length) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Duplicate workout sessions not allowed`));
                return;
            }

            let edits = '';
            if (name) {
                edits = `name=${escape(name)}`
            }

            if (!edits) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `No edit options`));
                return;
            }

            const editWS = await MysqlAdapter.query(`
                UPDATE daily_workout
                SET ${edits}
                WHERE
                    user_id = ${escape(user.id)}
                    AND id = ${escape(id)}
                    AND workouts_id = ${escape(workoutJournalId)}
            `);

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async deleteWorkoutJournalSession(req, res) {
        try {
            const user = req.user;
            const id = req.body.id;
            const workoutJournalId = req.body.workoutJournalId;

            if (!user || !id) {
                let invalidParam = ''
                if (!user) {
                    invalidParam = 'user'
                } else if (!id) {
                    invalidParam = 'workout session id'
                } else if (!workoutJournalId) {
                    workoutJournalId = 'workout journal id'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            const deleteWS = await MysqlAdapter.query(`
                DELETE FROM daily_workout
                WHERE
                    user_id = ${escape(user.id)}
                    AND id= ${escape(id)}
                    AND workouts_id = ${escape(workoutJournalId)}
            `);

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
                ORDER BY 
                    dw.name ASC
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
            const muscleGroups = req.body.muscleGroups;

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
                    INSERT INTO exercises (user_id,exercise,video_url,muscle_groups)
                        VALUES (
                            ${escape(user.id)},
                            ${escape(exercise)},
                            ${videoUrl ? escape(videoUrl) : "NULL"},
                            ${muscleGroups ? escape(muscleGroups) : "NULL"}
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

    async getWorkoutJournalSessionExercises(req, res) {
        try {
            const user = req.user;
            const workoutSessionId = req.query.workoutSessionId;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }

            if (!workoutSessionId) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid workout session id`));
                return;
            }

            const exercises = await MysqlAdapter.query(`
                SELECT
                    dwd.id as dailyWorkoutDataId,
                    dwd.daily_workout_id as workoutSessionId,
                    dwd.ordered,
                    dwd.sets,
                    dwd.periodization,
                    dwd.intensity_volume as intensityVolume,
                    dwd.markers,
                    e.id as id,
                    e.exercise,
                    e.video_url as videoLink,
                    e.muscle_groups as muscleGroups
                FROM daily_workout_data dwd
                LEFT JOIN exercises e ON dwd.exercise_id = e.id 
                WHERE
                    dwd.user_id = ${escape(user.id)}
                    AND dwd.daily_workout_id = ${escape(workoutSessionId)}
                ORDER BY dwd.ordered
            `);

            const supersetIndexes = {};
            const resExercises = [];
            let index = 0;

            for (const exercise of exercises) {
                const sets = exercise.sets ? exercise.sets.split(',') : [];
                const tempSets = [];
                for (const set of sets) {
                    const setTokens = set.split('|')
                    tempSets.push({ set: `Set ${setTokens[0] || 1}`, reps: setTokens[1] || '', rest: setTokens[2] || '' })
                }

                const markers = exercise.markers ? exercise.markers.split(',') : [];
                const tempMarkers = [];

                if (exercise.periodization) {
                    tempMarkers.push({ marker: 'Periodization', markerValue: exercise.periodization })
                }
                delete exercise.periodization;

                if (exercise.intensityVolume) {
                    tempMarkers.push({ marker: 'Intensity Volume', markerValue: exercise.intensityVolume })
                }
                delete exercise.intensityVolume;

                for (const marker of markers) {
                    const markerTokens = marker.split('|')
                    tempMarkers.push({ marker: markerTokens[0], markerValue: markerTokens[1] })
                }

                exercise.markers = tempMarkers;
                exercise.sets = tempSets;

                const tempOrdered = exercise.ordered.toString().split('.');
                if (tempOrdered.length > 1) {
                    if (supersetIndexes[tempOrdered[0]]) {
                        supersetIndexes[tempOrdered[0]].push(index);
                    } else {
                        supersetIndexes[tempOrdered[0]] = [index];
                    }
                } else {
                    resExercises[Number(tempOrdered[0]) - 1] = exercise;
                }
                index++;
            }

            for (const [key, values] of Object.entries(supersetIndexes)) {
                const superset = [];
                for (const value of values) {
                    superset.push(exercises[value]);
                }
                resExercises[Number(key) - 1] = { superset: superset };
            }

            res.json({ data: resExercises });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    }

    async addWorkoutJournalSessionExercises(req, res) {
        try {
            const user = req.user;
            const workoutSessionId = req.body.workoutSessionId;
            const sessionExercises = req.body.sessionExercises;

            if (!user) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid user`));
                return;
            }
            if (!workoutSessionId) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid workout session id`));
                return;
            }
            if (!sessionExercises) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid session exercises`));
                return;
            }
            if (sessionExercises.length) {
                if (sessionExercises.length >= 15) {
                    res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `You are not allowed to have more than 15 exercises per workout session`));
                    return;
                }
                for (const ex of sessionExercises) {
                    const exLabel = ex.exercise ? ` for ${ex.exercise}` : '';
                    let returnMessage = '';
                    if (!ex.id) {
                        returnMessage = `Missing exercise id${exLabel}`;
                    } else if (!ex.ordered) {
                        returnMessage = `Missing order of exercise${exLabel}`;
                    } else if ((ex.setsCount && !ex.sets) || (!ex.setsCount && ex.sets)) {
                        returnMessage = `Invalid sets${exLabel}`;
                    } else if ((ex.markersCount && !(ex.markers.length + ex.periodization.length + ex.intensityVolume.toString().length)) || (!ex.markersCount && (ex.markers.length || ex.periodization.length || ex.intensityVolume.toString().length))) {
                        returnMessage = `Invalid markers${exLabel}`;
                    }

                    if (returnMessage) {
                        res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, returnMessage));
                        return;
                    }
                }
            }

            const values = []
            for (const ex of sessionExercises) {
                let insert = `(${escape(user.id)},${escape(workoutSessionId)},${escape(ex.id)},${ex.markers ? escape(ex.markers) : "NULL"},${ex.periodization ? escape(ex.periodization) : "NULL"},${ex.intensityVolume ? escape(ex.intensityVolume) : "NULL"},${ex.sets ? escape(ex.sets) : "NULL"},${escape(ex.ordered)})`;
                values.push(insert);
            }

            await MysqlAdapter.transactionScope(async transactionQuery => {
                await transactionQuery(`
                    DELETE FROM
                        daily_workout_data
                    WHERE
                        user_id = ${escape(user.id)}
                        AND daily_workout_id = ${escape(workoutSessionId)}
                `)
                if (values.length) {
                    await transactionQuery(`
                    INSERT INTO 
                        daily_workout_data
                            (user_id, daily_workout_id, exercise_id, markers, periodization, intensity_volume, sets, ordered)
                    VALUES
                        ${values.join(',')}
                    `)
                }
            });

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    }
}