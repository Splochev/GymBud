const express = require('express');
const WeightTrackerController = require('./controllers/weightTracker-controller');
const UserController = require('./controllers/user-controller');
const WorkoutController = require('./controllers/workout-controller');

module.exports = class MainRouter {
    static build() {
        const router = express.Router();
        const weightTrackerController = new WeightTrackerController();
        const userController = new UserController();
        const workoutController = new WorkoutController();

        router.use('/user', userController.router);
        router.use('/weight-tracker', weightTrackerController.router);
        router.use('/workout', workoutController.router);
        return router;
    }
}