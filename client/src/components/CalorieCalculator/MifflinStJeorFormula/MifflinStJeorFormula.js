import useStyles from '../styles'
import { useState } from 'react';
import UGBMissingFields from '../../Global/UGBMissingFields.js';
import { UGBInput } from '../../Global/UGBInput.js';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { UGBRadioButtonsGroup } from '../../Global/UGBRadioButtonsGroup'
import clsx from 'clsx';

const MifflinStJeorFormula = ({ bmr }) => {
    const styles = useStyles();
    const [alert, setAlert] = useState('');
    const sex = useState('male')
    const weight = useState(undefined)
    const height = useState(undefined)
    const age = useState(undefined)

    function calculate(e) {
        e.preventDefault();
        try {
            if (!weight[0] || !height[0] || !age[0]) {
                throw Error('All fields are required!')
            }

            const parsedWeight = Number(weight[0]);
            const parsedHeight = Number(height[0]);
            const parsedAge = Number(age[0]);

            if (!parsedWeight || !parsedHeight || !parsedAge) {
                throw Error('All fields should be numbers!')
            }

            if (sex[0] === 'male') {
                bmr[1](((10 * parsedWeight) + (6.25 * parsedHeight) - (5 * parsedAge) + 5).toFixed(2));
            } else if (sex[0] === 'female') {
                bmr[1](((10 * parsedWeight) + (6.25 * parsedHeight) - (5 * parsedAge) - 161).toFixed(2));
            }
        } catch (err) {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={err.message} />)
        }
    }

    return (

        <div className="d-flex justify-content-center" >
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
                    type='number'
                    $value={weight}
                    placeholder="Weight"
                    min='1'
                    max='250'
                    iconStart='fas fa-weight'
                />
                <UGBInput
                    type='number'
                    $value={height}
                    placeholder="height"
                    min='1'
                    max='275'
                    iconStart='fas fa-ruler'
                />
                <UGBInput
                    type='number'
                    $value={age}
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
                        <div className="d-flex justify-content-center">Your BMR is:</div>
                        <input value={bmr[0]} type="number" className="form-control" disabled></input>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MifflinStJeorFormula;