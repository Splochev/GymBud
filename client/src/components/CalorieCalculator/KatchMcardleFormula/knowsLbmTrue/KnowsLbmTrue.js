import useStyles from '../../styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields.js';
import { UGBInput } from '../../../Global/UGBInput'

const KnowsLbmTrue = ({ bmr }) => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');
    const lbm = useState('')

    function calculate(e) {
        e.preventDefault();
        try {
            if (Number(lbm[0])) {
                bmr[1]((370 + (21.6 * Number(lbm[0]))).toFixed(2))
            } else {
                throw Error("Please provide a number for weight!")
            }
        } catch (err) {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'Please provide your lean body mass in kg.'} />)
        }
    }

    return (
        <div className="col">
            {alert}
            <form onSubmit={calculate}>
                <UGBInput
                    type="number"
                    $value={lbm}
                    min='1'
                    max='250'
                    placeholder="LBM"
                    iconStart='fas fa-weight'
                />
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate BMR">
                        <i className={"fas fa-calculator " + classes.icon}></i>
                    </button>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="form-group">
                        <div className="d-flex justify-content-center">Your BMR is:</div>
                        <input value={bmr[0]} type="number" className="form-control" disabled></input>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default KnowsLbmTrue;