import KatchMcardleFormula from './KatchMcardleFormula/KatchMcardleFormula';
import MifflinStJeorFormula from './MifflinStJeorFormula/MifflinStJeorFormula'
import { useState } from 'react';
import useStyles from './styles.js'
import UGBMissingFields from '../Global/UGBMissingFields';
import { UGBRadioButtonsGroup } from '../Global/UGBRadioButtonsGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import useWindowSize from '../utils/useWindowSize';
import { UGBButton } from '../Global/UGBButton';
import { UGBSelect, UGBMenuItem } from '../Global/UGBSelect';
import UGBHr from '../Global/UGBHr';
import UGBLabel from '../Global/UGBLabel';

const customStyles = {
    title: {
        textAlign: 'center',
        marginBottom: 8
    },
    subtitle1: {
        textAlign: 'center',
        marginBottom: -10
    },
    resultLabel: {
        textAlign: 'left',
        width: 160,
    }
}

const CalorieCalculator = () => {
    const size = useWindowSize();
    const styles = useStyles();
    const history = useHistory();
    const formula = useState('KatchMcardleFormula');
    const [alert, setAlert] = useState('');
    const tdee = useState(undefined);
    const bmr = useState(undefined);
    const selectedActivityIndex = useState('1.2');
    const [activityIndexes] = useState([
        { id: 1, label: '1.2 - If you rarely exercise', value: '1.2' },
        { id: 2, label: '1.375 - If you exercise on 1 to 3 days per week', value: '1.375' },
        { id: 3, label: '1.55 - If you exercise on 3 to 5 days per week', value: '1.55' },
        { id: 4, label: '1.725 - If you exercise 6 to 7 days per week', value: '1.725' },
        { id: 5, label: '1.9 - If you exercise every day and have a physical job or if you often exercise twice a day', value: '1.9' },
    ]);

    function calculate() {
        const activityIndexes = { '1.2': 1, '1.375': 1, '1.55': 1, '1.725': 1, '1.9': 1 };
        const indexInput = selectedActivityIndex[0];

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
                <UGBLabel
                    variant='h5'
                    style={customStyles.title}
                >
                    Calorie Calculator
                </UGBLabel>
                <UGBLabel
                    variant='subtitle1'
                    style={customStyles.subtitle1}
                >
                    Choose Formula:
                </UGBLabel>
                <UGBRadioButtonsGroup
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
                <UGBHr variant='horizontal' />
                <UGBLabel
                    variant='h5'
                    style={customStyles.title}
                >
                    BMR Calculator
                </UGBLabel>
                {formula[0] === 'KatchMcardleFormula' ? <KatchMcardleFormula bmr={bmr} /> : null}
                {formula[0] === 'MifflinStJeorFormula' ? <MifflinStJeorFormula bmr={bmr} /> : null}
                <UGBHr variant='horizontal' />
                <div className={styles.tdeeResult}>
                    <UGBLabel
                        variant='h5'
                        style={customStyles.title}
                    >
                        TDEE Calculator
                    </UGBLabel>
                    <UGBSelect label='Activity Index' $value={selectedActivityIndex}>
                        {activityIndexes.map(x => {
                            return (
                                <UGBMenuItem key={x.id} value={x.value}>
                                    {x.label}
                                </UGBMenuItem>
                            )
                        })}
                    </UGBSelect>
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
                        Your TDEE is: {!isNaN(Number(tdee[0])) ? <span className={styles.result}>{tdee[0].toFixed(2)}</span> : null}
                    </UGBLabel>
                </div>
                {alert}
            </div>
            <div className={styles.actions}>
                <UGBButton
                    type='submit'
                    btnType='secondary'
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                >
                    Close
                </UGBButton>
            </div>
        </div>
    );
}

export default CalorieCalculator;