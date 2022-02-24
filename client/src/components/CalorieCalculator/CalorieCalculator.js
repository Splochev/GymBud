import KatchMcardleFormula from './KatchMcardleFormula/KatchMcardleFormula';
import MifflinStJeorFormula from './MifflinStJeorFormula/MifflinStJeorFormula'
import { useState } from 'react';
import useStyles from './styles.js'
import UGBMissingFields from '../Global/UGBMissingFields';
import { UGBRadioButtonsGroup } from '../Global/UGBRadioButtonsGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import UGBButton from '../Global/UGBButton';
import { Typography } from '@material-ui/core';
import LiItem from '../Global/UGBLiItem';
import { useHistory } from 'react-router-dom';
import { UGBInput } from '../Global/UGBInput';
import clsx from 'clsx';
import useWindowSize from '../utils/useWindowSize';

const CalorieCalculator = () => {
    const size = useWindowSize();
    const styles = useStyles();
    const history = useHistory();
    const formula = useState('KatchMcardleFormula');
    const [alert, setAlert] = useState('');
    const tdee = useState(undefined);
    const bmr = useState(undefined);
    const activityIndex = useState(1.2);
    const [anchor, setAnchor] = useState(null);
    const [selectItems] = useState([
        {
            label: '1.2 - If you rarely exercise', path: null, onClick: () => {
                setAnchor(null);
                activityIndex[1](1.2);
            }
        },
        {
            label: '1.375 - If you exercise on 1 to 3 days per week', path: null, onClick: () => {
                setAnchor(null);
                activityIndex[1](1.375);
            }
        },
        {
            label: '1.55 - If you exercise on 3 to 5 days per week', path: null, onClick: () => {
                setAnchor(null);
                activityIndex[1](1.55);
            }
        },
        {
            label: '1.725 - If you exercise 6 to 7 days per week', path: null, onClick: () => {
                setAnchor(null);
                activityIndex[1](1.725);
            }
        },
        {
            labels: ['1.9 - If you exercise every day and have a', 'physical job or if you often exercise twice a day'], path: null, onClick: () => {
                setAnchor(null);
                activityIndex[1](1.9);
            }
        }
    ])

    function calculate() {
        const activityIndexes = { '1.2': 1, '1.375': 1, '1.55': 1, '1.725': 1, '1.9': 1 };
        const indexInput = activityIndex[0];
        const parsedBmr = Number(bmr[0]);
        try {
            if (!parsedBmr) {
                throw new Error('BMR result must not be empty.')
            }
            if (!activityIndexes[indexInput]) {
                throw new Error('Please select an activity index.')
            }
            tdee[1](parsedBmr * indexInput)
        } catch (err) {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={err.message} />)
        }
    }

    return (
        <div className={styles.calorieCalculatorContainer}>
            <div className={styles.container}>
                <Typography variant='h5' component='div' className={clsx(styles.title, styles.marginBottomTitle)} >Calorie Calculator</Typography>
                <Typography variant='subtitle2' component='div' className={styles.subTitle} >Choose Formula:</Typography>
                <UGBRadioButtonsGroup
                    label=""
                    display={size.width > 425 ? 'inline' : 'block'}
                    $checkedValue={formula}
                    customMap={() => {
                        return (
                            <>
                                <FormControlLabel key={'KatchMcardleFormula'} value={'KatchMcardleFormula'} control={<Radio />} label="Katch-McArdle" />
                                <FormControlLabel key={'MifflinStJeorFormula'} value={'MifflinStJeorFormula'} control={<Radio />} label="Mifflin-St Jeor" />
                            </>
                        );
                    }}
                />
                <hr className={clsx(styles.hr, styles.noPadding)} />
                <Typography variant='h6' component='div' className={clsx(styles.title, styles.marginBottomTitle)} >BMR Calculator</Typography>
                {formula[0] === 'KatchMcardleFormula' ? <KatchMcardleFormula bmr={bmr} /> : null}
                {formula[0] === 'MifflinStJeorFormula' ? <MifflinStJeorFormula bmr={bmr} /> : null}
                <hr className={styles.hr} />
                <div className={styles.tdeeResult}>
                    <Typography variant='h6' component='div' className={clsx(styles.title)} >TDEE calculator:</Typography>
                    <LiItem
                        type='select'
                        anchor={anchor}
                        setAnchor={setAnchor}
                        menuItems={selectItems}
                        customLabel={true}
                        variant='div'
                    >
                        <div className={styles.activityIndex}>
                            <UGBButton
                                onClick={(e) => setAnchor(e.currentTarget)}
                                btnType='neutral'
                            >
                                Chosen Activity Index: {activityIndex[0]}
                            </UGBButton>
                        </div>
                    </LiItem>
                    <UGBButton
                        btnType='success'
                        icon='fas fa-calculator'
                        title="Calculate TDEE"
                        onClick={calculate}
                    />
                    <Typography className={styles.subTitle} variant='subtitle2' component='div'>Your TDEE is:</Typography>
                    <UGBInput
                        $value={tdee}
                        type='number'
                        disabled={true}
                    />
                </div>
                {alert}
            </div>
            <div className={styles.actions}>
                <UGBButton
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                    btnType='danger'
                >
                    Close
                </UGBButton>
            </div>
        </div>
    );
}

export default CalorieCalculator;