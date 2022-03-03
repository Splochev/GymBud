import useStyles from '../styles'
import { useState } from 'react';
import UGBMissingFields from '../../Global/UGBMissingFields.js';
import { UGBIconInput } from '../../Global/UGBInput.js';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { UGBRadioButtonsGroup } from '../../Global/UGBRadioButtonsGroup'
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import useWindowSize from '../../utils/useWindowSize';
import { UGBButton } from '../../Global/UGBButton';
import { useEffect } from 'react';

const MifflinStJeorFormula = ({ bmr }) => {
    const styles = useStyles();
    const size = useWindowSize();
    const [alert, setAlert] = useState('');
    const sex = useState('male')
    const weight = useState(undefined)
    const height = useState(undefined)
    const age = useState(undefined)

    useEffect(() => { bmr[1]('') }, [])

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
                            <FormControlLabel key={'male'} value={'male'} control={<Radio />} label={<i className={clsx("fas fa-mars", styles.icon, styles.radioIcon)} />} />
                            <FormControlLabel key={'female'} value={'female'} control={<Radio />} label={<i className={clsx("fas fa-venus", styles.icon, styles.radioIcon)} />} />
                        </>
                    );
                }}
            />
            {size.width > 500 ?
                < div className={styles.inputs}>
                    <UGBIconInput
                        $value={weight}
                        required
                        startIcon='fas fa-weight'
                        label="Weight"
                    />
                    <UGBIconInput
                        $value={height}
                        required
                        startIcon='fas fa-ruler'
                        label="Height"
                    />
                    <UGBIconInput
                        $value={age}
                        required
                        startIcon='fas fa-user-clock'
                        label="Age"
                    />
                </div>
                :
                <>
                    < div className={styles.inputs}>
                        <UGBIconInput
                            $value={weight}
                            required
                            startIcon='fas fa-weight'
                            label="Weight"
                        />
                        <UGBIconInput
                            $value={height}
                            required
                            startIcon='fas fa-ruler'
                            label="Height"
                        />
                    </div>
                    <UGBIconInput
                        $value={age}
                        required
                        startIcon='fas fa-user-clock'
                        label="Age"
                    />
                </>
            }
            <UGBButton
                type='submit'
                btnType='primary'
                onClick={calculate}
                startIcon={<i className={clsx('fas fa-calculator', styles.icon)} />}
            >
                Calculate
            </UGBButton>
            <Typography
                className={clsx(styles.subTitle, styles.marginTopTitle, styles.resultLabel)}
                variant='subtitle2'
                component='div'>
                Your BMR is: {!isNaN(Number(bmr[0])) ? <span className={styles.result}>{bmr[0]}</span> : null}
            </Typography>
        </form >
    );
}

export default MifflinStJeorFormula;