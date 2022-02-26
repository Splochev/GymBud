exports.up = function (knex) {
    return knex.schema.raw(`
        CREATE TABLE workouts(
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        DROP TABLE workouts
    `)
};