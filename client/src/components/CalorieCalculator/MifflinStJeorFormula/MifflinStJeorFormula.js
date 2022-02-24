import useStyles from '../styles'
import { useState } from 'react';
import UGBMissingFields from '../../Global/UGBMissingFields.js';
import { UGBInput } from '../../Global/UGBInput.js';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { UGBRadioButtonsGroup } from '../../Global/UGBRadioButtonsGroup'
import clsx from 'clsx';
import UGBButton from '../../Global/UGBButton';
import { Typography } from '@material-ui/core';

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
        <form className={styles.form} onSubmit={calculate}>
            {alert}
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
            <UGBInput
                type='number'
                $value={weight}
                label="Weight"
                min='1'
                max='250'
                iconStart='fas fa-weight'
            />
            <UGBInput
                type='number'
                $value={height}
                label="Height"
                min='1'
                max='275'
                iconStart='fas fa-ruler'
            />
            <UGBInput
                type='number'
                $value={age}
                label="Age"
                min='1'
                max='125'
                iconStart='fas fa-user-clock'
            />
            <UGBButton
                icon='fas fa-calculator'
                title="Calculate BMR"
                type="submit"
                btnType='success'
            />
            <Typography className={clsx(styles.subTitle, styles.marginTopTitle)} variant='subtitle2' component='div'>Your BMR is:</Typography>
            <UGBInput
                $value={bmr}
                type='number'
                disabled={true}
            />
        </form>
    );
}

export default MifflinStJeorFormula;