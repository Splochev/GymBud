import useStyles from './styles.js'
import { useState } from 'react';
import disable from '../../../Global/disableUrl.js';
import MissingFields from '../../../Global/MissingFields.js';

const KnowsLbmTrue = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(event) {
        event.preventDefault();
        const bmr = document.getElementById("bmr-result");
        const lbm = document.getElementById("lean-body-mass");
        bmr.value = '';
        if (lbm.value) {
            bmr.value = 370 + (21.6 * lbm.value);
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={' Please provide your Lean Body Mass.'} />)
        }
        lbm.value = '';
    }

    return (

        <div className="col" id="knows-lbm-true-form">
            {alert}
            <form onSubmit={disable}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className={"fas fa-weight " + classes.icon}></i></span>
                    </div>
                    <input type="number" className="form-control" id="lean-body-mass" placeholder="Lean Body Mass"></input>
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

export default KnowsLbmTrue;