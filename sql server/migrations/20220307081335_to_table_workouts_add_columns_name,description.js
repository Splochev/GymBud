exports.up = async function (knex) {
    await knex.schema.raw(`
        ALTER TABLE workouts
        ADD name VARCHAR(255) NOT NULL
    `)

    return knex.schema.raw(`
        ALTER TABLE workouts
        ADD description TEXT
    `)
};

exports.down = async function (knex) {
    await knex.schema.raw(`
        ALTER TABLE workouts
        DROP COLUMN name
    `)

    return knex.schema.raw(`
        ALTER TABLE workouts
        DROP COLUMN description
    `)
};