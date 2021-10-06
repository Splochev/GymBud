import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import foodRoutes from './routes/foods.js'

const app = express();
app.use(cors());

/**
 * Everytime I go to @Link "http://localhost:5000/food" + "/getfoods", "/getfood" or "/addfood"
 * a function will be executed from @file{server\controllers\foods.js} to the server
 * "/getfoods" -> executes @function getFoods();
 * "/getfood"  -> executes @function getFood();
 * "/addfood"  -> executes @function addFood();
 * 
 * To add a new route to @link http://localhost:5000/food go to @file{server\routes\foods.js}
 */
app.use('/food', foodRoutes)

const CONNECTION_URL = 'mongodb+srv://splochev:tb7U6i8CXtKg.No@cluster0.afasl.mongodb.net/UrGymBud?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT))
    .catch((error) => console.log(error));