import { useState, useEffect } from "react";
import MissingFields from "../Global/MissingFields";
import useStyles from './styles'

const AddFood = ({ showAddFood, setAddFood }) => {
    const [alert, setAlert] = useState('');
    const classes = useStyles();


    useEffect(() => {
        if (showAddFood) {
            document.getElementById('add-food').addEventListener('click', (e) => {
                if (e.target.className == 'modal fade' || e.target.className == 'modal fade show') {
                    setAddFood(false);
                }
            })
        }
    }, [showAddFood]);

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
        const foodName = formData.get('food-name');
        const carbs = formData.get('carbs');
        const fat = formData.get('fat');
        const protein = formData.get('protein');
        const calories = formData.get('calories');

        if ((Number(protein) + Number(carbs) + Number(fat)) <= 100 && (Number(protein) + Number(carbs) + Number(fat)) >= 0) {
            //adding food to server
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'The sum of protein, fat and carbs mustn\'t exceed 100 grams.'} />)
        }
    }

    return (
        <div className="modal fade" id="add-food">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Food</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => { setAddFood(false) }}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {alert}
                        <div className="container mt-3">
                            <form onSubmit={addFood}>
                                <div class="form-group">
                                    <div className="input-group-prepend">
                                        <span className={"input-group-text" + ' ' + classes.borderless}><i className="fas fa-utensils"></i></span>
                                        <input type="text" className={"form-control" + ' ' + classes.borderless} name='food-name' placeholder="Food name..." required></input>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div className="input-group-prepend">
                                        <span className={"input-group-text" + ' ' + classes.borderless}><i className="fas fa-bread-slice"></i></span>
                                        <input type="number" className={"form-control" + ' ' + classes.borderless} name='carbs' placeholder="Carbs per 100 grams..." min="0" max="100" required></input>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div className="input-group-prepend">
                                        <span className={"input-group-text" + ' ' + classes.borderless}><i className="fas fa-fish"></i></span>
                                        <input type="number" className={"form-control" + ' ' + classes.borderless} name='fat' placeholder="Fat per 100 grams..." min="0" max="100" required ></input>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div className="input-group-prepend">
                                        <span className={"input-group-text" + ' ' + classes.borderless}><i className="fas fa-drumstick-bite"></i></span>
                                        <input type="number" className={"form-control" + ' ' + classes.borderless} name='protein' placeholder="Protein per 100 grams..." min="0" max="100" required></input>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div className="input-group-prepend">
                                        <span className={"input-group-text" + ' ' + classes.borderless}><i className="fas fa-burn"></i></span>
                                        <input type="number" className={"form-control" + ' ' + classes.borderless} name='calories' placeholder="Calories Per 100 grams" min="0" max="900" required></input>
                                        <span className={"input-group-text" + ' ' + classes.borderless + ' ' + classes.calculatorBtn} data-toggle="tooltip" title="Calculate the calories of the food" onClick={calculate}> <i className={"fas fa-calculator" + ' ' + classes.icon}></i></span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success">
                                        Add To My Food
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { setAddFood(false) }}>Close</button>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default AddFood;