import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields';
import { UGBIconInput } from '../Global/UGBInput'
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UGBButton } from '../Global/UGBButton';
import UGBHr from '../Global/UGBHr';
import UGBLabel from '../Global/UGBLabel';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        gap: theme.spacing(1),
        '& button': {
            width: theme.spacing(9.5),
        }
    },
    inputs: {
        display: 'flex',
        width: '100%',
        gap: theme.spacing(2),
        '@media (max-width: 460px)': {
            flexDirection: 'column',
        }
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
            <UGBLabel variant='h5'>
                Add Food
            </UGBLabel>
            <UGBHr type='horizontal' />
            {alert}
            <div className={styles.inputs}>
                <UGBIconInput
                    $value={carbs}
                    required
                    label='Food Name'
                    startIcon='fas fa-utensils'
                />
                <UGBIconInput
                    $value={carbs}
                    required
                    label='Carbs per 100 grams'
                    startIcon='fas fa-bread-slice'
                />
            </div>
            <div className={styles.inputs}>
                <UGBIconInput
                    $value={fat}
                    required
                    label='Fat per 100 grams'
                    startIcon='fas fa-fish'
                />
                <UGBIconInput
                    $value={protein}
                    required
                    label='Protein per 100 grams'
                    startIcon='fas fa-drumstick-bite'
                />
            </div>
            <UGBIconInput
                $value={calories}
                required
                label='Calories Per 100 grams'
                startIcon='fas fa-burn'
                endIcon='fas fa-calculator'
                $$onClick={calculate}
            />
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Add
                </UGBButton>
            </div>
        </form>
    );
}

export default AddFood;