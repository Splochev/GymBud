import useStyles from '../../styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields';
import { UGBInput } from '../../../Global/UGBInput'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { UGBRadioButtonsGroup } from '../../../Global/UGBRadioButtonsGroup'
import clsx from 'clsx'
import UGBButton from '../../../Global/UGBButton';
import { Typography } from '@material-ui/core';
import useWindowSize from '../../../utils/useWindowSize';

const KnowsLbmFalse = ({ bmr }) => {
    const styles = useStyles();
    const [alert, setAlert] = useState('');
    const sex = useState('male')
    const weight = useState(undefined);
    const height = useState(undefined);
    const size = useWindowSize();

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
        <form className={styles.form} onSubmit={calculate}>
            {alert}
            <UGBRadioButtonsGroup
                label="Sex:"
                display={size.width > 350 ? 'inline' : 'block'}
                displayFormControl={size.width > 350 ? 'inline' : 'block'}
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
                type="number"
                $value={weight}
                min='1'
                max='250'
                label="Weight"
                iconStart='fas fa-weight'
            />
            <UGBInput
                type='number'
                $value={height}
                min='1'
                max='275'
                label="Height"
                iconStart='fas fa-ruler'
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
                maxWidth={111}
            />
        </form >
    );
}

export default KnowsLbmFalse;