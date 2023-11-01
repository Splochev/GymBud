exports.up = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE exercises
        ADD muscle_groups VARCHAR(255)
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE exercises
        DROP COLUMN muscle_groups
    `)
};