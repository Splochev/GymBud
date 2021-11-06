import useStyles from './styles.js'
import { useState } from 'react';
import MissingFields from '../../Global/MissingFields.js';

const MifflinStJeorFormula = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const male = document.getElementById("male-mifflin-st-jeor-radio").checked;
        const female = document.getElementById("female-mifflin-st-jeor-radio").checked;
        const result = document.getElementsByName("bmr-result")[0];

        const weight = formData.get('weight')
        const height = formData.get('height')
        const age = formData.get('age')

        try {
            if (male) {
                result.value = ((10 * weight) + (6.25 * height) - (5 * age) + 5).toFixed(2);
            } else if (female) {
                result.value = ((10 * weight) + (6.25 * height) - (5 * age) - 161).toFixed(2);
            }
        } catch (err) {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required!'} />)
        }
    }

    return (
        <div>
            {alert}
            <div className="d-flex justify-content-center" >
                <form onSubmit={calculate}>
                    <div className="d-flex justify-content-center">
                        <span>Gender:&#160;&#160;</span>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="male-mifflin-st-jeor-radio" name="gender" defaultChecked></input>
                            <label className="custom-control-label" htmlFor="male-mifflin-st-jeor-radio"><i
                                className={"fas fa-mars " + classes.icon}></i></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="female-mifflin-st-jeor-radio" name="gender"></input>
                            <label className="custom-control-label" htmlFor="female-mifflin-st-jeor-radio"><i
                                className={"fas fa-venus " + classes.icon}></i></label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrependWeight}`}><i className={"fas fa-weight " + classes.icon}></i></div>
                            <input type="number" className={"form-control " + classes.cornerless} name='weight' min='1' max='250' placeholder="Weight" required></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-ruler " + classes.icon}></i></div>
                            <input type="number" className={"form-control " + classes.cornerless} name='height' min='1' max='275' placeholder="Height" required></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group-prepend">
                            <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-user-clock " + classes.icon}></i></div>
                            <input type="number" className={"form-control " + classes.cornerless} name='age' min='0' max='125' placeholder="Age" required></input>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate BMR">
                            <i className={"fas fa-calculator " + classes.icon}></i>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="form-group">
                            <div className="d-flex justify-content-center">
                                <label htmlFor="bmr-result">Your BMR is:</label>
                            </div>
                            <input type="number" className="form-control" name='bmr-result' disabled></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MifflinStJeorFormula;