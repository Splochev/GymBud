import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields';
import { makeStyles } from '@material-ui/core';
import { UGBInput } from '../Global/UGBInput'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '20px',
    },
    calculatorBtn: {
        borderRadius: '0px',
        background: '#28A745',
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#218838',
            border: '1px solid #1E7E34',
        },
        '&:focus': {
            border: '1px solid #1E7E34',
            background: '#218838',
            boxShadow: 'rgb(163,217,176) 0px 0px 0px 3px',
            outline: 'none'
        },
    }
}));

function calculateWeightAndCalories(carbs, fat, protein, req) {
    let weight = 0;
    let calories = 0;

    const parsedCarbs = Number(carbs);
    const parsedFat = Number(fat);
    const parsedProtein = Number(protein);

    if (parsedProtein) {
        weight += parsedProtein;
        calories += parsedProtein * 4;
    }
    if (parsedFat) {
        weight += parsedFat;
        calories += parsedFat * 9;
    }
    if (parsedCarbs) {
        weight += parsedCarbs;
        calories += parsedCarbs * 4
    }
    if (req === 'weight') {
        return weight;
    } else if (req === 'calories') {
        return calories;
    }
    return { calories: calories, weight: weight }
}

const AddFood = () => {
    const [alert, setAlert] = useState('');
    const styles = useStyles();
    const carbs = useState(undefined);
    const fat = useState(undefined);
    const protein = useState(undefined)
    const calories = useState(undefined)
    const foodName = useState('')

    function calculate(e) {
        e.preventDefault();
        const weightAndCalories = calculateWeightAndCalories(carbs[0], fat[0], protein[0])
        if (weightAndCalories.weight <= 100 && weightAndCalories.weight >= 0) {
            calories[1](weightAndCalories.calories);
        } else {
            calories[1](undefined);
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'The sum of protein, fat and carbs must be between 0 and 100 grams.'} />)
        }
    }

    function addFood(e) {
        e.preventDefault();
        const weightAndCalories = calculateWeightAndCalories(carbs[0], fat[0], protein[0])
        if (weightAndCalories.weight <= 100 && weightAndCalories.weight >= 0 && foodName[0]) {
            console.log('adding to server---->',
                {
                    foodName: foodName[0],
                    carbs: carbs[0],
                    fat: fat[0],
                    protein: protein[0],
                    calories: calories[0]
                })
        } else {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'The sum of protein, fat and carbs must be between 0 and 100 grams.'} />)
        }
    }

    return (
        <div>
            <h4 className='form-group d-flex justify-content-center row' >Add Food</h4>
            <hr />
            {alert}
            <form className='container mt-3' onSubmit={addFood}>
                <UGBInput
                    type='text'
                    placeholder='Food Name'
                    iconStart='fas fa-utensils'
                    $value={foodName}
                />
                <UGBInput
                    type='number'
                    placeholder='Carbs per 100 grams'
                    min='0'
                    max='100'
                    iconStart='fas fa-bread-slice'
                    $value={carbs}
                />
                <UGBInput
                    type='number'
                    placeholder='Fat per 100 grams'
                    min='0'
                    max='100'
                    iconStart='fas fa-fish'
                    $value={fat}
                />
                <UGBInput
                    type='number'
                    placeholder='Protein per 100 grams'
                    min='0'
                    max='100'
                    iconStart='fas fa-drumstick-bite'
                    $value={protein}
                />
                <UGBInput
                    type='number'
                    placeholder='Calories Per 100 grams'
                    min='0'
                    max='900'
                    iconStart='fas fa-burn'
                    $value={calories}
                >
                    <button
                        className={clsx('input-group-text', styles.calculatorBtn,)}
                        data-toggle="tooltip"
                        title="Calculate the calories of the food"
                        onClick={calculate}
                    >
                        <i className={clsx("fas fa-calculator", styles.icon)} />
                    </button>
                </UGBInput>
                <div className='d-flex justify-content-center'>
                    <button type='submit' className='btn btn-success'>
                        Add To My Food
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddFood;