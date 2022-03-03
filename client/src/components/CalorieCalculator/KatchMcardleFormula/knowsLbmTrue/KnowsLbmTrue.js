import useStyles from '../../styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields.js';
import { UGBIconInput } from '../../../Global/UGBInput'
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { UGBButton } from '../../../Global/UGBButton';
import { useEffect } from 'react';

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
            <Typography
                className={clsx(styles.subTitle, styles.marginTopTitle, styles.resultLabel)}
                variant='subtitle2'
                component='div'>
                Your BMR is: {!isNaN(Number(bmr[0])) ? <span className={styles.result}>{bmr[0]}</span> : null}
            </Typography>
        </form>
    );
}

export default KnowsLbmTrue;