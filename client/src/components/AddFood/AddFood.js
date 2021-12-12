import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields';
import useStyles from './styles'
import { UGBInput } from '../Global/UGBInput'
import clsx from 'clsx'

const AddFood = () => {
    const [alert, setAlert] = useState('');
    const styles = useStyles();

    function calculate(e) {
        e.preventDefault();
        const carbs = document.getElementsByName('carbs')[0];
        const fat = document.getElementsByName('fat')[0];
        const protein = document.getElementsByName('protein')[0];
        const calories = document.getElementsByName('calories')[0];

        if ((Number(protein.value) + Number(carbs.value) + Number(fat.value)) <= 100 && (Number(protein.value) + Number(carbs.value) + Number(fat.value)) >= 0) {
            calories.value = carbs.value * 4 + protein.value * 4 + fat.value * 9;
        } else {
            calories.value = '';
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'The sum of protein, fat and carbs mustn\'t exceed 100 grams.'} />)
        }
    }

    function addFood(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        // const foodName = formData.get('food-name');
        const carbs = formData.get('carbs');
        const fat = formData.get('fat');
        const protein = formData.get('protein');
        // const calories = formData.get('calories');

        if ((Number(protein) + Number(carbs) + Number(fat)) <= 100 && (Number(protein) + Number(carbs) + Number(fat)) >= 0) {
            //adding food to server
        } else {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'The sum of protein, fat and carbs mustn\'t exceed 100 grams.'} />)
        }
    }

    return (
        <div>
            <div className='form-group d-flex justify-content-center row'>
                <h4>One Rep Max Calculator</h4>
            </div>
            <hr></hr>
            {alert}
            <div className='container mt-3'>
                <form onSubmit={addFood}>
                    <UGBInput
                        type='text'
                        name='food-name'
                        placeholder='Food Name'
                        iconStart='fas fa-utensils'
                    />
                    <UGBInput
                        type='number'
                        name='carbs'
                        placeholder='Carbs per 100 grams'
                        min='0'
                        max='100'
                        iconStart='fas fa-bread-slice'
                    />
                    <UGBInput
                        type='number'
                        name='fat'
                        placeholder='Fat per 100 grams'
                        min='0'
                        max='100'
                        iconStart='fas fa-fish'
                    />
                    <UGBInput
                        type='number'
                        name='protein'
                        placeholder='Protein per 100 grams'
                        min='0'
                        max='100'
                        iconStart='fas fa-drumstick-bite'
                    />
                    <UGBInput
                        type='number'
                        name='calories'
                        placeholder='Calories Per 100 grams'
                        min='0'
                        max='900'
                        iconStart='fas fa-burn'
                    >
                        <div
                            className={clsx('input-group-text', styles.calculatorBtn,)}
                            data-toggle="tooltip"
                            title="Calculate the calories of the food"
                            onClick={calculate}
                        >
                            <i className={clsx("fas fa-calculator", styles.icon)} />
                        </div>
                    </UGBInput>
                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-success'>
                            Add To My Food
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddFood;