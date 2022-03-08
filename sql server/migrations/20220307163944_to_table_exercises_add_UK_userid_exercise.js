exports.up = async function (knex) {
    return knex.schema.raw(`
        ALTER TABLE exercises
        ADD CONSTRAINT UK_user_id_exercise UNIQUE (user_id,exercise)
    `)
};

exports.down = async function (knex) {
    await knex.schema.raw(`
        ALTER TABLE exercises
        DROP CONSTRAINT exercises_ibfk_1
    `)

    await knex.schema.raw(`
        ALTER TABLE exercises
        DROP CONSTRAINT UK_user_id_exercise
    `)

    return knex.schema.raw(`
        ALTER TABLE exercises
        ADD CONSTRAINT exercises_ibfk_1
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    `)
};