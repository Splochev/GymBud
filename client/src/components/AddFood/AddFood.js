import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields';
import { UGBInput } from '../Global/UGBInput'
import { Typography } from '@material-ui/core';
import UGBButton from '../Global/UGBButton';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hr: {
        width: '100%',
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
    },
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
    const styles = useStyles();
    const history = useHistory();
    const [alert, setAlert] = useState('');
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
        <form className={styles.form} onSubmit={addFood}>
            <Typography variant='h5' component='div' style={{ textAlign: 'center', color: '#1B1B1B' }} >Add Food</Typography>
            <hr className={styles.hr} />
            {alert}
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
                <UGBButton
                    btnType='inputButton'
                    title='Calculate the calories of the food'
                    icon='fas fa-calculator'
                    onClick={calculate}
                    variant='success'
                />
            </UGBInput>
            <div className={styles.actions}>
                <UGBButton
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                    btnType='danger'
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    btnType='success'
                    type='submit'
                >
                    Add To My Food
                </UGBButton>
            </div>
        </form>
    );
}

export default AddFood;