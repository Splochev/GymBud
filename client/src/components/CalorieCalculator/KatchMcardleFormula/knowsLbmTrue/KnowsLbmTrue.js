import useStyles from './styles.js'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields.js';

const KnowsLbmTrue = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const lbm = formData.get('lbm');
        const bmr = document.getElementsByName("bmr-result")[0];

        try {
            if (lbm) {
                bmr.value = (370 + (21.6 * lbm)).toFixed(2);
            }
        } catch (err) {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'Please provide your lean body mass in kg.'} />)
        }
    }

    return (

        <div className="col" id="knows-lbm-true-form">
            {alert}
            <form onSubmit={calculate}>
                <div className="form-group">
                    <div className="input-group-prepend">
                        <div className={`input-group-text ${classes.cornerless} ${classes.iconPrepend}`}><i className={"fas fa-weight " + classes.icon}></i></div>
                        <input type="number" className={"form-control " + classes.cornerless} name='lbm' min='1' max='250' placeholder="LBM" required></input>
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
    );
}

export default KnowsLbmTrue;