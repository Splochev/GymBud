const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const MysqlAdapter = require('./mysql-adapter');
const { escape } = require('mysql');

module.exports = class PassportUtils {
    static default() {
        this.ActivateLocalStrategy();
        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((userDto, done) => {
            done(null, userDto);
        });
    }

    static ActivateLocalStrategy() {
        passport.use(new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async function (email, password, done) {
                try {
                    const userByEmail = await MysqlAdapter.query(`SELECT * FROM users WHERE email = ${escape(email)} LIMIT 1`);
                    if (userByEmail.length) {
                        let check = bcrypt.compareSync(password, userByEmail[0].password);

                        if (!check) return done(null, false, { message: 'Incorrect password.' });

                        return done(null, userByEmail[0]);
                    } else return done(null, false, { message: 'Incorrect email or password!' });

                } catch (error) {
                    done(error);
                }
            }
        ));
    }
}