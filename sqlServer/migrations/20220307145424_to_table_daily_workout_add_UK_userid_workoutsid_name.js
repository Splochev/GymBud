exports.up = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE daily_workout
        ADD CONSTRAINT UK_user_id_workouts_id_name UNIQUE (user_id,workouts_id,name);
    `)
};

exports.down = async function (knex) {
    await knex.schema.raw(`
        ALTER TABLE daily_workout
        DROP CONSTRAINT daily_workout_ibfk_1
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout
        DROP CONSTRAINT daily_workout_ibfk_2
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout
        DROP CONSTRAINT UK_user_id_workouts_id_name
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout
        ADD CONSTRAINT daily_workout_ibfk_1
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    `)

    return knex.schema.raw(`
        ALTER TABLE daily_workout
        ADD CONSTRAINT daily_workout_ibfk_2
        FOREIGN KEY (workouts_id) REFERENCES workouts(id) ON DELETE CASCADE
    `)
};