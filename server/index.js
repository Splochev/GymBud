require('dotenv').config();
const express = require('express');
const session = require("express-session");
const passport = require('passport');
const bodyParser = require('body-parser');
const schedule = require('node-schedule')

const cors = require('cors');
const MysqlAdapter = require('./utils/mysql-adapter');
const PassportUtils = require('./utils/passport-local-strategy');
const MainRouter = require('./routers');
const app = express();
const port = process.env.SERVER_PORT;

MysqlAdapter.init(process.env.DB_HOST, process.env.DB_PORT
    , process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, parseInt(process.env.DB_POOL_LIMIT));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
}));
app.use(passport.initialize());
app.use(passport.session());
PassportUtils.default();
const corsOptions = {
    credentials: true,
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use('/api', MainRouter.build());

app.listen(port, () => {
    console.log(`Gym Bud Server listening on http://localhost:${port}`)
});

schedule.scheduleJob('0 0 * * *', async () => {
    console.log("in")
    await MysqlAdapter.query(`DELETE FROM users WHERE verification_token_expires_on <= now()`)
    await MysqlAdapter.query(`
            UPDATE users
            SET
                change_password_token_expires_on=null,
                change_password_token=null
            WHERE
               change_password_token_expires_on <= now()
        `)
}) 