exports.up = function (knex) {
    return knex.schema.raw(`
        ALTER TABLE users
        MODIFY change_password_token_expires_on DATETIME
    `);
};

exports.down = function (knex) {
  return knex.schema.raw(`
        ALTER TABLE users
        MODIFY change_password_token_expires_on DATE
  `);
};
