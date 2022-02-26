exports.up = function (knex) {
    return knex.schema.raw(`
        CREATE TABLE exercises(
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT,
        exercise VARCHAR(255) NOT NULL,
        video_url VARCHAR(1000),
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        DROP TABLE exercises
    `)
};