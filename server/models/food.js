import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    creator: String,
    category: String,
    subcategory: String,
    name: String,
    quantity: Number,
    protein: Number,
    carbs: Number,
    calories: Number
})

const Food = mongoose.model('food', foodSchema);
export default Food;