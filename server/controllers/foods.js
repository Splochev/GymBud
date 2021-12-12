import Food from '../models/food.js'

/**
 * Everytime I go to @Link "http://localhost:5000/food" + "/getfoods", "/getfood" or "/addfood"
 * a function will be executed from here to the server
 * "/getfoods" -> executes @function getFoods();
 * "/getfood"  -> executes @function getFood();
 * "/addfood"  -> executes @function addFood();
 * 
 * Once i create a new function here i need to create a route in 
 * @file{server\routes\foods.js} and connect them together
 */

export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addFood = async (req, res) => {
    const food = req.body;
    const newFood = new Food(food);
    try {
        await newFood.save();
        res.status(200).json(newFood);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getFood = async (req, res) => {
    // const foodMatch = req.body;
    let foodMatch = new RegExp(req.body, 'i');
    try {
        const food = await Food.find({ name: foodMatch }, 'name protein carbs calories').exec();
        res.status(200).json(food);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//delete food method
//update food method
