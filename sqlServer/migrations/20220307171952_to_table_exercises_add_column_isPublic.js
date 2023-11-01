exports.up = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE exercises
        ADD isPublic BOOL DEFAULT '0'
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE exercises
        DROP COLUMN isPublic
    `)
};