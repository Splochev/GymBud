import useStyles from '../../styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields';
import { UGBIconInput } from '../../../Global/UGBInput'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { UGBRadioButtonsGroup } from '../../../Global/UGBRadioButtonsGroup'
import clsx from 'clsx'
import useWindowSize from '../../../utils/useWindowSize';
import { UGBButton } from '../../../Global/UGBButton';
import { useEffect } from 'react';
import UGBLabel from '../../../Global/UGBLabel';

const customStyles = {
    resultLabel: {
        textAlign: 'left',
        width: 160,
        marginTop: 8
    }
}

const KnowsLbmFalse = ({ bmr }) => {
    const styles = useStyles();
    const [alert, setAlert] = useState('');
    const sex = useState('male')
    const weight = useState(undefined);
    const height = useState(undefined);
    const size = useWindowSize();

    useEffect(() => { bmr[1]('') }, [])

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
                display='inline'
                displayFormControl={size.width > 350 ? 'inline' : 'block'}
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
            <UGBButton
                type='submit'
                btnType='primary'
                onClick={calculate}
                startIcon={<i className={clsx('fas fa-calculator', styles.icon)} />}
            >
                Calculate
            </UGBButton>
            <UGBLabel
                variant='subtitle1'
                style={customStyles.resultLabel}
            >
                Your BMR is: {!isNaN(Number(bmr[0])) ? <span className={styles.result}>{bmr[0]}</span> : null}
            </UGBLabel>
        </form >
    );
}

export default KnowsLbmFalse;