import useStyles from '../../styles'
import { useState } from 'react';
import UGBMissingFields from '../../../Global/UGBMissingFields.js';
import { UGBInput } from '../../../Global/UGBInput'
import UGBButton from '../../../Global/UGBButton';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const KnowsLbmTrue = ({ bmr }) => {
    const styles = useStyles();
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
        <form className={styles.form} onSubmit={calculate}>
            {alert}
            <UGBInput
                type="number"
                $value={lbm}
                min='1'
                max='250'
                label="LBM"
                iconStart='fas fa-weight'
            />
            <UGBButton
                icon='fas fa-calculator'
                title="Calculate BMR"
                type="submit"
                btnType='success'
            />
            <Typography className={clsx(styles.subTitle,styles.marginTopTitle)} variant='subtitle2' component='div'>Your BMR is:</Typography>
            <UGBInput
                $value={bmr}
                type='number'
                disabled={true}
                maxWidth={123}
            />
        </form>
    );
}

export default KnowsLbmTrue;