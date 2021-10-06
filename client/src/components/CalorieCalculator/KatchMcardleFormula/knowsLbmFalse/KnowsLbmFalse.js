import useStyles from './styles'
import { useState } from 'react';
import disable from '../../../Global/disableUrl';
import MissingFields from '../../../Global/MissingFields';

const KnowsLbmFalse = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(event) {
        event.preventDefault();
        const bmr = document.getElementById("bmr-result");
        const weight = document.getElementById("weight");
        const height = document.getElementById("height");

        const male = document.getElementById("male-katch-mcardle-form");
        const female = document.getElementById("female-katch-mcardle-form");

        bmr.value = '';
        if (weight.value && height.value && male.checked) {
            bmr.value = 370 + (21.6 * (0.407 * weight.value + 0.267 * height.value - 19.2));
        } else if (weight.value && height.value && female.checked) {
            bmr.value = 370 + (21.6 * (0.252 * weight.value + 0.473 * height.value - 48.3));
        }
        else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'Please provide your weight and height.'} />)
        }
        weight.value = "";
        height.value = "";
    }

    return (
        <div className="col" id="knows-lbm-false-form">
            {alert}
            <form onSubmit={disable}>
                <div className="d-flex justify-content-center">
                    <span>Gender:&#160;&#160;</span>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="male-katch-mcardle-form" name="example"
                            value="customEx" defaultChecked></input>
                        <label className="custom-control-label" htmlFor="male-katch-mcardle-form"><i
                            className={"fas fa-mars " + classes.icon}></i></label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" className="custom-control-input" id="female-katch-mcardle-form" name="example"
                            value="customEx"></input>
                        <label className="custom-control-label" htmlFor="female-katch-mcardle-form"><i
                            className={"fas fa-venus " + classes.icon}></i></label>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className={"fas fa-weight " + classes.icon}></i></span>
                    </div>
                    <input type="number" className="form-control" placeholder="Weight" id="weight"></input>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className={"fas fa-ruler " + classes.icon}></i></span>
                    </div>
                    <input type="number" className="form-control" placeholder="Height" id="height"></input>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-success" data-toggle="tooltip" title="Calculate BMR" onClick={calculate}>
                        <i className={"fas fa-calculator " + classes.icon}></i>
                    </button>
                </div>
            </form>

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

export default KnowsLbmFalse;