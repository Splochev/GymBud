exports.up = function (knex) {
    return knex.schema.raw(`
        CREATE TABLE daily_workout_weight_entries(
        daily_workout_data_id INT NOT NULL,
        weight_entries VARCHAR(255),
        createdOn VARCHAR(255),
        FOREIGN KEY(daily_workout_data_id) REFERENCES daily_workout_data(id) ON DELETE CASCADE,
        CONSTRAINT UK_daily_workout_data_id_createdOn UNIQUE (daily_workout_data_id,createdOn))
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        DROP TABLE daily_workout_weight_entries
    `)
};
