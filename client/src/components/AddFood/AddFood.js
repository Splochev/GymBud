import { useState } from "react";
import MissingFields from "../Global/MissingFields";
import useStyles from './styles'
import UGBModal from "../Global/UGBModal";

const AddFood = ({ setAddFood }) => {
    const [alert, setAlert] = useState('');
    const classes = useStyles();

    function calculate(e) {
        e.preventDefault();
        const carbs = document.getElementsByName("carbs")[0];
        const fat = document.getElementsByName("fat")[0];
        const protein = document.getElementsByName("protein")[0];
        const calories = document.getElementsByName("calories")[0];

        if ((Number(protein.value) + Number(carbs.value) + Number(fat.value)) <= 100 && (Number(protein.value) + Number(carbs.value) + Number(fat.value)) >= 0) {
            calories.value = carbs.value * 4 + protein.value * 4 + fat.value * 9;
        } else {
            calories.value = '';
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'The sum of protein, fat and carbs mustn\'t exceed 100 grams.'} />)
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
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'The sum of protein, fat and carbs mustn\'t exceed 100 grams.'} />)
        }
    }

    return (
        <UGBModal width='sm' handleClose={setAddFood}>
            <div className="form-group d-flex justify-content-center row">
                <h4>One Rep Max Calculator</h4>
            </div>
            <hr></hr>
            {alert}
            <div className="container mt-3">
                <form onSubmit={addFood}>
                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-utensils " + classes.icon}></i></div>
                            <input type="text" className={"form-control " + classes.cornerless} name='food-name' placeholder="Food name" required></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-bread-slice " + classes.icon}></i></div>
                            <input type="number" className={"form-control " + classes.cornerless} name='carbs' placeholder="Carbs per 100 grams" min="0" max="100" required></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-fish " + classes.icon}></i></div>
                            <input type="number" className={"form-control " + classes.cornerless} name='fat' placeholder="Fat per 100 grams" min="0" max="100" required ></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-drumstick-bite " + classes.icon}></i></div>
                            <input type="number" className={"form-control " + classes.cornerless} name='protein' placeholder="Protein per 100 grams" min="0" max="100" required></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrependFire}`}><i className={"fas fa-burn " + classes.icon}></i></div>
                            <input type="number" className={"form-control " + classes.cornerless} name='calories' placeholder="Calories Per 100 grams" min="0" max="900" required></input>
                            <div className={`input-group-text ${classes.cornerless} ${classes.calculatorBtn} ${classes.iconPrepend}`} data-toggle="tooltip" title="Calculate the calories of the food" onClick={calculate}> <i className={"fas fa-calculator " + classes.icon}></i></div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">
                            Add To My Food
                        </button>
                    </div>
                </form>
            </div>
        </UGBModal>
    );
}

export default AddFood;