exports.up = function (knex) {
    return knex.schema.raw(`
        CREATE TABLE daily_workout_data(
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        daily_workout_id INT NOT NULL,
        exercise_id INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(daily_workout_id) REFERENCES daily_workout(id) ON DELETE CASCADE,
        FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE)
    `)
};

exports.down = function (knex) {
    return knex.schema.raw(`
        DROP TABLE daily_workout_data
    `)
};