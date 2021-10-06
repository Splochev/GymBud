import useStyles from './styles.js'
import { useState } from 'react';
import disable from '../../Global/disableUrl.js';
import MissingFields from '../../Global/MissingFields.js';

const MifflinStJeorFormula = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculateBmr(event) {
        event.preventDefault();
        const male = document.getElementById("male-mifflin-st-jeor").checked;
        const female = document.getElementById("female-mifflin-st-jeor").checked;
        const weight = document.getElementById("weight").value;
        const height = document.getElementById("height").value;
        const age = document.getElementById("age").value;
        const result = document.getElementById("bmr-result");

        result.value = '';
        if (male && weight && height && age) {
            result.value = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            document.getElementById("weight").value = '';
            document.getElementById("height").value = '';
            document.getElementById("age").value = '';
        } else if (female && weight && height && age) {
            result.value = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            document.getElementById("weight").value = '';
            document.getElementById("height").value = '';
            document.getElementById("age").value = '';
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required!'} />)
        }
    }



    return (
        <div>
            {alert}
            <div className="d-flex justify-content-center" >
                <form onSubmit={disable} id="mifflin-st-jeor">
                    <div className="d-flex justify-content-center">
                        <span>Gender:&#160;&#160;</span>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="male-mifflin-st-jeor" name="example"
                                value="customEx" defaultChecked ></input>
                            <label className="custom-control-label" htmlFor="male-mifflin-st-jeor"><i className={"fas fa-mars " + classes.icon}></i></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="female-mifflin-st-jeor" name="example"
                                value="customEx" ></input>
                            <label className="custom-control-label" htmlFor="female-mifflin-st-jeor"><i
                                className={"fas fa-venus " + classes.icon}></i></label>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className={"fas fa-weight " + classes.icon}></i></span>
                        </div>
                        <input type="number" className="form-control" id="weight" placeholder="Weight"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className={"fas fa-ruler " + classes.icon}></i></span>
                        </div>
                        <input type="number" className="form-control" id="height" placeholder="Height"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className={"fas fa-user-clock " + classes.icon}></i></span>
                        </div>
                        <input type="number" className="form-control" id="age" placeholder="Age"></input>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-success" data-toggle="tooltip" title="Calculate BMR" onClick={calculateBmr}>
                            <i className={"fas fa-calculator " + classes.icon}></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-center">
                <form onSubmit={disable}>
                    <div className="form-group">
                        <div className="d-flex justify-content-center">
                            <label htmlFor="bmr-result">Your BMR is:</label>
                        </div>
                        <input type="number" className="form-control" id="bmr-result" disabled></input>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default MifflinStJeorFormula;