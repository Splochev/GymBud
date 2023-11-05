exports.up = async function (knex) {
    return knex.schema.raw(`
        ALTER TABLE workouts
        ADD CONSTRAINT UK_user_id_name UNIQUE (user_id,name)
    `)
};

exports.down = async function (knex) {
    await knex.schema.raw(`
        ALTER TABLE workouts
        DROP CONSTRAINT workouts_ibfk_1
    `)

    await knex.schema.raw(`
        ALTER TABLE workouts
        DROP CONSTRAINT UK_user_id_name
    `)

    return knex.schema.raw(`
        ALTER TABLE workouts
        ADD CONSTRAINT workouts_ibfk_1
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    `)
};