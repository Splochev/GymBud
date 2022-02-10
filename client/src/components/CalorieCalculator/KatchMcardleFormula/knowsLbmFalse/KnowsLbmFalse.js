import useStyles from '../../styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields';
import { UGBInput } from '../../../Global/UGBInput'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { UGBRadioButtonsGroup } from '../../../Global/UGBRadioButtonsGroup'
import clsx from 'clsx'

const KnowsLbmFalse = ({ bmr }) => {
    const styles = useStyles();
    const [alert, setAlert] = useState('');
    const sex = useState('male')
    const weight = useState(undefined);
    const height = useState(undefined);

    function calculate(e) {
        e.preventDefault();
        const parsedHeight = Number(height[0]);
        const parsedWeight = Number(weight[0]);

        try {
            if (sex[0] === 'male') {
                bmr[1]((370 + (21.6 * (0.407 * parsedWeight + 0.267 * parsedHeight - 19.2))).toFixed(2));
            } else if (sex[0] === 'female') {
                bmr[1]((370 + (21.6 * (0.252 * parsedWeight + 0.473 * parsedHeight - 48.3))).toFixed(2));
            }
        } catch (err) {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'Please provide your weight in kg, height in cm and select gender.'} />)
        }
    }

    return (
        <div className="col">
            {alert}
            <form onSubmit={calculate}>
                <div className="d-flex justify-content-center">
                    <UGBRadioButtonsGroup
                        label="Sex:"
                        display='inline'
                        $checkedValue={sex}
                        customMap={() => {
                            return (
                                <>
                                    <FormControlLabel key={'male'} value={'male'} control={<Radio />} label={<i className={clsx("fas fa-mars", styles.icon)} />} />
                                    <FormControlLabel key={'female'} value={'female'} control={<Radio />} label={<i className={clsx("fas fa-venus", styles.icon)} />} />
                                </>
                            );
                        }}

                    />
                </div>
                <UGBInput
                    type="number"
                    $value={weight}
                    min='1'
                    max='250'
                    placeholder="Weight"
                    iconStart='fas fa-weight'
                />
                <UGBInput
                    type='number'
                    $value={height}
                    min='1'
                    max='275'
                    placeholder="Height"
                    iconStart='fas fa-ruler'
                />
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate BMR">
                        <i className={"fas fa-calculator " + styles.icon}></i>
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

export default KnowsLbmFalse;