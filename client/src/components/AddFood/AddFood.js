import { useState } from "react";
import MissingFields from "../Global/MissingFields";

const AddFood = () => {
    const [alert, setAlert] = useState('');

    function calculate(e) {
        e.preventDefault();
        const carbs = document.getElementById("addFood-carbs");
        const fat = document.getElementById("addFood-fat");
        const protein = document.getElementById("addFood-protein");
        const calories = document.getElementById("addFood-calories");

        if ((carbs.value <= 100 && carbs.value >= 0) && (fat.value <= 100 && fat.value >= 0) && (protein.value <= 100 && protein.value >= 0) && ((Number(protein.value) + Number(carbs.value) + Number(fat.value)) <= 100 && (Number(protein.value) + Number(carbs.value) + Number(fat.value)) >= 0)) {
            calories.value = carbs.value * 4 + protein.value * 4 + fat.value * 9;
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required! Protein, fat and carbs cannot exceed 100 grams, nor can their sum.'} />)
        }
    }

    function addFood(e) {
        e.preventDefault();
        const foodName = document.getElementById("addFood-foodName");
        const carbs = document.getElementById("addFood-carbs");
        const fat = document.getElementById("addFood-fat");
        const protein = document.getElementById("addFood-protein");
        const calories = document.getElementById("addFood-calories");

        if ((foodName.value && !/^\s*$/.test(foodName.value)) && (calories.value <= 900 && calories.value >= 0) && (carbs.value <= 100 && carbs.value >= 0) && (fat.value <= 100 && fat.value >= 0) && (protein.value <= 100 && protein.value >= 0) && ((Number(protein.value) + Number(carbs.value) + Number(fat.value)) <= 100 && (Number(protein.value) + Number(carbs.value) + Number(fat.value)) >= 0)) {
            //adding food to server
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required! Protein, fat and carbs cannot exceed 100 grams, nor can their sum.'} />)
        }
    }

    return (
        <div className="modal fade" id="add-food">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Food</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        {alert}
                        <div className="container mt-3">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-utensils"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Food name..." id='addFood-foodName' required></input>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-bread-slice"></i></span>
                                    </div>
                                    <input type="number" className="form-control" placeholder="Carbs per 100 grams..." id='addFood-carbs' required></input>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-fish"></i></span>
                                    </div>
                                    <input type="number" className="form-control" placeholder="Fat per 100 grams..." id='addFood-fat' required ></input>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-drumstick-bite"></i></span>
                                    </div>
                                    <input type="number" className="form-control" placeholder="Protein per 100 grams..." id='addFood-protein' required></input>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-burn"></i></span>
                                    </div>
                                    <input type="number" className="form-control" placeholder="Calories Per 100 grams" id='addFood-calories' required></input>
                                    <div className="input-group-prepend">
                                        <button type="button" className="btn btn-success" data-toggle="tooltip" title="Calculate the calories of the food" onClick={calculate}>
                                            <i className="fas fa-calculator"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center"><button type="button" className="btn btn-success" onClick={addFood}>Add
                                    Food<br></br>To My Food</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFood;