import useStyles from './styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields';
import { UGBInput } from '../../../Global/UGBInput'

const KnowsLbmFalse = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const height = formData.get('height');
        const weight = formData.get('weight');
        const bmr = document.getElementsByName("bmr-result")[0];
        const male = document.getElementById("male-katch-mcardle-radio");
        const female = document.getElementById("female-katch-mcardle-radio");

        try {
            if (male.checked) {
                bmr.value = (370 + (21.6 * (0.407 * weight + 0.267 * height - 19.2))).toFixed(2);
            } else if (female.checked) {
                bmr.value = (370 + (21.6 * (0.252 * weight + 0.473 * height - 48.3))).toFixed(2);
            }
        } catch (err) {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'Please provide your weight in kg, height in cm and select gender.'} />)
        }
    }

    return (
        <div className="col" id="knows-lbm-false-form">
            {alert}
            <form onSubmit={calculate}>
                <div className="d-flex justify-content-center">
                    <span>Gender:&#160;&#160;</span>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="male-katch-mcardle-radio" name="gender" defaultChecked></input>
                        <label className="custom-control-label" htmlFor="male-katch-mcardle-radio"><i
                            className={"fas fa-mars " + classes.icon}></i></label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="female-katch-mcardle-radio" name="gender"></input>
                        <label className="custom-control-label" htmlFor="female-katch-mcardle-radio"><i
                            className={"fas fa-venus " + classes.icon}></i></label>
                    </div>
                </div>
                <UGBInput
                    type="number"
                    name='weight'
                    min='1'
                    max='250'
                    placeholder="Weight"
                    iconStart='fas fa-weight'
                />
                <UGBInput
                    type='number'
                    name='height'
                    min='1'
                    max='275'
                    placeholder="Height"
                    iconStart='fas fa-ruler'
                />
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
    );
}

export default KnowsLbmFalse;