import useStyles from '../../styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields.js';
import { UGBIconInput } from '../../../Global/UGBInput'
import clsx from 'clsx';
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

const KnowsLbmTrue = ({ bmr }) => {
    const styles = useStyles();
    const [alert, setAlert] = useState('');
    const lbm = useState('')

    useEffect(() => { bmr[1]('') }, [])

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
        <form className={styles.form} onSubmit={calculate}>
            {alert}
            <UGBIconInput
                $value={lbm}
                required
                startIcon='fas fa-weight'
                label="Lean Body Mass"
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
        </form>
    );
}

export default KnowsLbmTrue;