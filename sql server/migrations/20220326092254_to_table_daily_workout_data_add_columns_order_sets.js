exports.up = async function (knex) {
    await knex.schema.raw(`
        ALTER TABLE daily_workout_data 
        ADD markers TEXT
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout_data 
        ADD periodization VARCHAR(15)
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout_data 
        ADD intensity_volume DOUBLE
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout_data 
        ADD sets VARCHAR(255)
    `)

    return knex.schema.raw(`
        ALTER TABLE daily_workout_data 
        ADD ordered DOUBLE NOT NULL
    `)
};

exports.down = async function (knex) {
    await knex.schema.raw(`
        ALTER TABLE daily_workout_data
        DROP COLUMN markers
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout_data
        DROP COLUMN periodization
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout_data
        DROP COLUMN intensity_volume
    `)

    await knex.schema.raw(`
        ALTER TABLE daily_workout_data
        DROP COLUMN sets
    `)

    return knex.schema.raw(`
        ALTER TABLE daily_workout_data
        DROP COLUMN ordered
    `)
};

