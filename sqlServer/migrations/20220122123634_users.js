exports.up = function (knex) {
    return knex.schema.raw(`
        CREATE TABLE users(
            id INT NOT NULL AUTO_INCREMENT,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(1500) NOT NULL,
            last_name VARCHAR(1500) NOT NULL,
            sex ENUM('male', 'female') NOT NULL,
            active_status ENUM('pending', 'active', 'disabled') NOT NULL DEFAULT 'pending',
            user_type ENUM('user', 'trainer', 'admin') NOT NULL DEFAULT 'user',
            created_on DATE NOT NULL,
            verification_token_expires_on DATE,       
            verification_token VARCHAR(255) UNIQUE,
            change_password_token_expires_on DATE,       
            change_password_token VARCHAR(255) UNIQUE,
            PRIMARY KEY (id),
            CONSTRAINT email_unique UNIQUE (email)
        )
    `)
};

exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TABLE users
    `)
};
