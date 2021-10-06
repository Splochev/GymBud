import express from 'express';
import { getFoods, addFood, getFood } from '../controllers/foods.js'



/**
 * Everytime I go to one of these routes, the relevant function 
 * will be executed coming from @file{server\controllers\foods.js}
 * 
 * To add a new route, syntax is:
 * router.{httpMethod}({'/route name'},{function});
 * 
 * To add a new function go to @file {server\controllers\foods.js}
 */
const router = express.Router();

router.get('/getfoods', getFoods);
router.get('/getfood', getFood);
router.post('/addFood', addFood);


export default router;