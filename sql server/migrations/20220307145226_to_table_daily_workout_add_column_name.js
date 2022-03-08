exports.up = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE daily_workout
        ADD name VARCHAR(255) NOT NULL
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE daily_workout
        DROP COLUMN name
    `)
};