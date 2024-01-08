const express = require('express');
const MysqlAdapter = require('../utils/mysql-adapter');
const { escape } = require('mysql');
const ErrorHandler = require('../utils/error-handler');
const AuthHelpers = require('../utils/auth-helpers');

function parseDate(date, delimiter = '-') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (!year || !month || !day) {
        return ''
    }
    return `${year}${delimiter}${month < 10 ? `0${month}` : month}${delimiter}${day < 10 ? `0${day}` : day}`
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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


        this.router.put('/add-weight-entries', AuthHelpers.loggedIn, (req, res) => this.addWeightEntries(req, res));
        this.router.put('/add-reps-entry', AuthHelpers.loggedIn, (req, res) => this.addRepsEntry(req, res));
        this.router.post('/get-repetitions-data', AuthHelpers.loggedIn, (req, res) => this.getRepetitionsData(req, res));
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
    };

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

            const exercises = await MysqlAdapter.query(`
                SELECT
                    id,
                    exercise_id
                FROM daily_workout_data
                WHERE
                    user_id = ${escape(user.id)}
                    AND daily_workout_id = ${escape(workoutSessionId)}
            `);

            const forDelete = [];
            const forUpdate = [];

            for (const exercise of exercises) {
                const foundExerciseIndex = sessionExercises.findIndex(ex => ex.id === exercise.exercise_id);
                if (foundExerciseIndex < 0) {
                    forDelete.push(exercise.id);
                } else {
                    sessionExercises[foundExerciseIndex].dailyWorkoutDataId = exercise.id;
                    forUpdate.push(sessionExercises[foundExerciseIndex]);
                    sessionExercises.splice(foundExerciseIndex, 1);
                }
            }

            const forInsert = sessionExercises;

            await MysqlAdapter.transactionScope(async transactionQuery => {
                if (forDelete.length) {
                    await transactionQuery(`
                        DELETE FROM
                            daily_workout_data
                        WHERE
                            user_id = ${escape(user.id)}
                            AND daily_workout_id = ${escape(workoutSessionId)}
                            AND id IN (${forDelete.join()})
                    `)
                }

                if (forInsert.length) {
                    const values = []
                    for (const ex of forInsert) {
                        let insert = `(${escape(user.id)},${escape(workoutSessionId)},${escape(ex.id)},${ex.markers ? escape(ex.markers) : "NULL"},${ex.periodization ? escape(ex.periodization) : "NULL"},${ex.intensityVolume ? escape(ex.intensityVolume) : "NULL"},${ex.sets ? escape(ex.sets) : "NULL"},${escape(ex.ordered)})`;
                        values.push(insert);
                    }

                    await transactionQuery(`
                    INSERT INTO 
                        daily_workout_data
                            (user_id, daily_workout_id, exercise_id, markers, periodization, intensity_volume, sets, ordered)
                    VALUES
                        ${values.join(',')}
                    `)
                }

                if (forUpdate.length) {
                    for (const ex of forUpdate) {
                        await transactionQuery(`
                            UPDATE daily_workout_data
                            SET
                                markers = ${ex.markers ? escape(ex.markers) : "NULL"},
                                periodization = ${ex.periodization ? escape(ex.periodization) : "NULL"},
                                intensity_volume = ${ex.intensityVolume ? escape(ex.intensityVolume) : "NULL"},
                                sets = ${ex.sets ? escape(ex.sets) : "NULL"},
                                ordered = ${escape(ex.ordered)}
                            WHERE
                                id = ${escape(ex.dailyWorkoutDataId)}
                        `)
                    }
                }
            });

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async addWeightEntries(req, res) {
        try {
            const weightEntires = req.body;

            if (!weightEntires || !weightEntires.length) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid weight entries`));
                return;
            }
    
            let createdOn = '';
            const weightEntriesIds = weightEntires.map(we => {
                const weight = we.weight;
                const forSet = we.forSet;
                createdOn = we.createdOn;
                const dailyWorkoutDataId = we.dailyWorkoutDataId;
    
                if (isNaN(Number(weight)) || !forSet || !createdOn || !dailyWorkoutDataId) {
                    let invalidParam = ''
                    if (isNaN(Number(weight))) {
                        invalidParam = 'weight'
                    } else if (!forSet) {
                        invalidParam = 'forSet'
                    } else if (!createdOn) {
                        invalidParam = 'createdOn'
                    } else if (!dailyWorkoutDataId) {
                        invalidParam = 'dailyWorkoutDataId'
                    }
                    res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                    return;
                }
    
               return escape(we.dailyWorkoutDataId);
            }).join(',');
    
            const entries = await MysqlAdapter.query(`
                SELECT
                    *
                FROM daily_workout_weight_entries      
                WHERE
                    daily_workout_data_id IN (${weightEntriesIds})
                    AND createdOn = ${escape(createdOn)}
            `);
    
            const forUpdate = [];
            const forInsert = [];
    
            for (const entry of entries) {
                const weightEntry = JSON.parse(entry['weight_entries']);
                const foundEntryIndex = weightEntires.findIndex(we => we.dailyWorkoutDataId === entry.daily_workout_data_id);
                if (foundEntryIndex !== -1) {
                    weightEntry[weightEntires[foundEntryIndex].forSet] = Number(weightEntires[foundEntryIndex].weight);
                    const entryString = JSON.stringify(weightEntry)
    
                    forUpdate.push({ entry: entryString, dailyWorkoutDataId: entry.daily_workout_data_id });
                    weightEntires.splice(foundEntryIndex, 1);
                }
            }
    
            for (const entry of weightEntires) {
                const entryString = `{"${entry.forSet}":${Number(entry.weight)}}`;
                forInsert.push({ entry: entryString, dailyWorkoutDataId: entry.dailyWorkoutDataId });
            }
    
            await MysqlAdapter.transactionScope(async transactionQuery => {
                if (forUpdate.length) {
                    for (const entry of forUpdate) {
                        await transactionQuery(`
                            UPDATE daily_workout_weight_entries
                            SET weight_entries = ${escape(entry.entry)}
                            WHERE
                                daily_workout_data_id = ${escape(entry.dailyWorkoutDataId)}
                                AND createdOn = ${escape(createdOn)}
                        `)
                    }
                }
    
                if (forInsert.length) {
                    const values = [];
                    for (const entry of forInsert) {
                        values.push(`(${escape(entry.dailyWorkoutDataId)},${escape(entry.entry)},${escape(createdOn)})`);
                    }
    
                    await transactionQuery(`
                        INSERT INTO daily_workout_weight_entries(daily_workout_data_id,weight_entries,createdOn)
                            VALUES ${values.join(',')}
                    `)
                }
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async addRepsEntry(req, res) {
        try {
            const reps = req.body.reps;
            const forSet = req.body.forSet;
            const createdOn = req.body.createdOn;
            const dailyWorkoutDataId = req.body.dailyWorkoutDataId;

            if (isNaN(Number(reps)) || !forSet || !createdOn || !dailyWorkoutDataId) {
                let invalidParam = ''
                if (isNaN(Number(reps))) {
                    invalidParam = 'reps'
                } else if (!forSet) {
                    invalidParam = 'forSet'
                } else if (!createdOn) {
                    invalidParam = 'createdOn'
                } else if (!dailyWorkoutDataId) {
                    invalidParam = 'dailyWorkoutDataId'
                }
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid ${invalidParam}`));
                return;
            }

            const entries = await MysqlAdapter.query(`
                SELECT
                    *
                FROM daily_workout_reps_entries
                WHERE
                    daily_workout_data_id = ${escape(dailyWorkoutDataId)}
                    AND createdOn = ${escape(createdOn)}
            `);

            if (entries.length) {
                const repsEntries = JSON.parse(entries[0]['reps_entries']);
                repsEntries[forSet] = Number(reps);
                const entry = JSON.stringify(repsEntries)

                await MysqlAdapter.query(`
                    UPDATE daily_workout_reps_entries
                    SET reps_entries = ${escape(entry)}
                    WHERE
                        daily_workout_data_id = ${escape(dailyWorkoutDataId)}
                        AND createdOn = ${escape(createdOn)}
                 `);
            } else {
                const entry = `{"${forSet}":${Number(reps)}}`;
                await MysqlAdapter.query(`
                    INSERT INTO daily_workout_reps_entries(daily_workout_data_id,reps_entries,createdOn)
                        VALUES (
                            ${escape(dailyWorkoutDataId)},
                            ${escape(entry)},
                            ${escape(createdOn)}
                        )
                 `);
            }

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };

    async getRepetitionsData(req, res) {
        try {
            if (!req.body || !req.body.length) {
                res.status(409).json(ErrorHandler.GenerateError(409, ErrorHandler.ErrorTypes.bad_param, `Invalid dailyWorkoutDataId`));
                return;
            }

            const dailyWorkoutDataIds = req.body;
            const limit = dailyWorkoutDataIds.length === 1 ? 6 : 1;
            const order = dailyWorkoutDataIds.length === 1 ? 'ASC' : 'DESC';
            const today = parseDate(new Date(), '/');
            const todayFilter = dailyWorkoutDataIds.length > 1 ? `AND createdOn != ${escape(today)}` : '';

            const weightEntries = await Promise.all(
                dailyWorkoutDataIds.map(id => {
                    return MysqlAdapter.query(`
                        SELECT * FROM daily_workout_weight_entries      
                        WHERE daily_workout_data_id = ${escape(id)} ${todayFilter}
                        ORDER BY createdOn ${order}
                        LIMIT ${limit}
                    `);
                })
            );
            const flatWeightEntries = weightEntries.flat();

            const repsEntries = await Promise.all(
                dailyWorkoutDataIds.map(id => {
                    return MysqlAdapter.query(`
                        SELECT * FROM daily_workout_reps_entries      
                        WHERE daily_workout_data_id = ${escape(id)} ${todayFilter}
                        ORDER BY createdOn ${order}
                        LIMIT ${limit}
                    `);
                })
            );
            const flatRepsEntries = repsEntries.flat();

            const resArr = [];
            for (const dailyWorkoutDataId of dailyWorkoutDataIds) {
                let todaysData = {};
                const historicalEntires = {};
                
                for (const entry of flatWeightEntries) {
                    if(entry.daily_workout_data_id !== dailyWorkoutDataId){
                        continue;
                    }

                    const weightEntry = JSON.parse(entry['weight_entries']);
                    if (entry.createdOn === today) {
                        for (const key of Object.keys(weightEntry)) {
                            todaysData[key] = { weight: Number(weightEntry[key]) || '', reps: '' };
                        }
                    } else {
                        let createdOnAsString = new Date(entry.createdOn);
                        const month = createdOnAsString.getMonth() + 1;
                        const day = createdOnAsString.getDate();
                        createdOnAsString = `${days[createdOnAsString.getDay()]} ${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`;
                        for (const key of Object.keys(weightEntry)) {
                            const historicalEntry = { weight: Number(weightEntry[key]) || '', reps: '', date: createdOnAsString }
                            if (historicalEntires[key]) {
                                historicalEntires[key].push(historicalEntry)
                            } else {
                                historicalEntires[key] = [historicalEntry]
                            }
                        }
                    }
                }

                for (const entry of flatRepsEntries) {
                    if(entry.daily_workout_data_id !== dailyWorkoutDataId){
                        continue;
                    }
                    
                    const repEntry = JSON.parse(entry['reps_entries']);
                    if (entry.createdOn === today) {
                        for (const key of Object.keys(repEntry)) {
                            if (todaysData[key]) {
                                todaysData[key].reps = Number(repEntry[key]) || '';
                            } else {
                                todaysData[key] = { weight: '', reps: Number(repEntry[key]) || '' };
                            }
                        }
                    } else {
                        let createdOnAsString = new Date(entry.createdOn);
                        const month = createdOnAsString.getMonth() + 1;
                        const day = createdOnAsString.getDate();
                        createdOnAsString = `${days[createdOnAsString.getDay()]} ${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`;
                        for (const key of Object.keys(repEntry)) {
                            if (historicalEntires[key]) {
                                const historicalEntry = historicalEntires[key].find(he => he.date === createdOnAsString);
                                if (historicalEntry) {
                                    historicalEntry.reps = Number(repEntry[key]) || '';
                                } else {
                                    historicalEntires[key].push({ reps: Number(repEntry[key]) || '', weight: '', date: createdOnAsString });
                                }
                            } else {
                                historicalEntires[key] = [{ reps: Number(repEntry[key]) || '', weight: '', date: createdOnAsString }]
                            }
                        }
                    }
                }

                if (!Object.keys(todaysData).length) {
                    todaysData = null;
                }
                resArr.push({ todaysData: todaysData, historicalEntires: historicalEntires });
            }

            res.json(resArr);
        } catch (error) {
            console.log(error)
            res.status(500).json(ErrorHandler.GenerateError(500, ErrorHandler.ErrorTypes.server_error, 'Server error!'));
        }
    };
}