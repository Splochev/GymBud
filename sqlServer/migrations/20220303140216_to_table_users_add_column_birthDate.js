exports.up = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE users
        ADD birth_date DATE NOT NULL;
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE users
        DROP COLUMN birth_date;
    `)
};