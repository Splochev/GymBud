import useStyles from './styles.js'
import { useState } from 'react';
import UGBMissingFields from '../../Global/UGBMissingFields.js';
import { UGBInput } from '../../Global/UGBInput.js';

const MifflinStJeorFormula = () => {
    const styles = useStyles();
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
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'All fields are required!'} />)
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
                                className={"fas fa-mars " + styles.icon}></i></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="female-mifflin-st-jeor-radio" name="gender"></input>
                            <label className="custom-control-label" htmlFor="female-mifflin-st-jeor-radio"><i
                                className={"fas fa-venus " + styles.icon}></i></label>
                        </div>
                    </div>
                    <UGBInput
                        type='number'
                        name='weight'
                        placeholder="Weight"
                        min='1'
                        max='250'
                        iconStart='fas fa-weight'
                    />
                    <UGBInput
                        type='number'
                        name='height'
                        placeholder="height"
                        min='1'
                        max='275'
                        iconStart='fas fa-ruler'
                    />
                    <UGBInput
                        type='number'
                        name='age'
                        placeholder="Age"
                        min='1'
                        max='125'
                        iconStart='fas fa-user-clock'
                    />
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate BMR">
                            <i className={"fas fa-calculator " + styles.icon}></i>
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