const express = require('express');
const WeightTrackerController = require('./controllers/weightTracker-controller');
const UserController = require('./controllers/user-controller');

module.exports = class MainRouter {
    static build() {
        const router = express.Router();
        const weightTrackerController = new WeightTrackerController();
        const userController = new UserController();

        router.use('/user', userController.router);
        router.use('/weight-tracker', weightTrackerController.router);
        return router;
    }
}