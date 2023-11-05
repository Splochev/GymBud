exports.up = function (knex) {
    return knex.schema.raw(`
        CREATE TABLE weight_tracker(
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        date DATE NOT NULL,
        weight DOUBLE NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT uq_user_id_date UNIQUE (user_id,date)
        )
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        DROP TABLE weight_tracker
    `)
};