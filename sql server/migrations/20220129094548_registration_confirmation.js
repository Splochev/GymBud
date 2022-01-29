exports.up = function (knex) {
    return knex.schema.raw(`
        CREATE TABLE registration_confirmation (
            id INT NOT NULL AUTO_INCREMENT,
            user_id INT NOT NULL,
            expires_on DATE NOT NULL,
            token VARCHAR(255) NOT NULL UNIQUE,
            PRIMARY KEY(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        DROP TABLE registration_confirmation
    `)
};