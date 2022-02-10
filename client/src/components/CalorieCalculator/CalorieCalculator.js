import KatchMcardleFormula from './KatchMcardleFormula/KatchMcardleFormula';
import MifflinStJeorFormula from './MifflinStJeorFormula/MifflinStJeorFormula'
import { useState } from 'react';
import useStyles from './styles.js'
import UGBMissingFields from '../Global/UGBMissingFields';
import clsx from 'clsx'
import { UGBRadioButtonsGroup } from '../Global/UGBRadioButtonsGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const CalorieCalculator = () => {
    const classes = useStyles();
    const formula = useState('KatchMcardleFormula');
    const [alert, setAlert] = useState('');
    const tdee = useState(undefined);
    const bmr = useState(undefined);

    function onSelectedActivityIndex(event) {
        event.preventDefault();
        const indexValue = event.target.id;
        const indexInput = document.getElementById("activity-index");
        indexInput.textContent = 'Chosen Activity Index: ' + indexValue;
    }

    function calculate() {
        const indexInput = document.getElementById("activity-index").textContent.substring(23);
        const parsedBmr = Number(bmr[0]);

        try {
            if (parsedBmr) {
                switch (indexInput) {
                    case '1.2':
                        tdee[1](parsedBmr * 1.2)
                        break;
                    case '1.375':
                        tdee[1](parsedBmr * 1.375)
                        break;
                    case '1.55':
                        tdee[1](parsedBmr * 1.55)
                        break;
                    case '1.725':
                        tdee[1](parsedBmr * 1.725)
                        break;
                    case '1.9':
                        tdee[1](parsedBmr * 1.9)
                        break;
                    default:
                        throw new Error('Please select an activity index.')
                }
            } else {
                throw new Error('BMR result must not be empty.')
            }
        } catch (err) {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={err.message} />)
        }
    }

    return (
        <div className={classes.calorieCalculatorContainer}>
            <h4 className="form-group d-flex justify-content-center row">Calorie Calculator</h4>
            <div className={clsx("d-flex justify-content-center")}>
                <UGBRadioButtonsGroup
                    label=""
                    display='inline'
                    $checkedValue={formula}
                    customMap={() => {
                        return (
                            <>
                                <FormControlLabel key={'KatchMcardleFormula'} value={'KatchMcardleFormula'} control={<Radio />} label='Use Katch-McArdle Formula' />
                                <FormControlLabel key={'MifflinStJeorFormula'} value={'MifflinStJeorFormula'} control={<Radio />} label='Use Mifflin-St Jeor Formula' />
                            </>
                        );
                    }}
                />
            </div>
            <hr />
            <h4 className="d-flex justify-content-center">BMR calculator:</h4>
            {formula[0] === 'KatchMcardleFormula' ? <KatchMcardleFormula bmr={bmr} /> : null}
            {formula[0] === 'MifflinStJeorFormula' ? <MifflinStJeorFormula bmr={bmr} /> : null}
            <hr />
            <h4 className="d-flex justify-content-center">TDEE calculator:</h4>
            {alert}


            <div className="d-flex justify-content-center">
                <div className={clsx('dropdown dropright', classes.activityIndexDropownWrap)} id="dropdown-activity-index">
                    <button type="button" className={clsx("btn btn-secondary", classes.activityIndexDropownButton)} id="activity-index" data-toggle="dropdown">
                        Choose Activity Index
                    </button>
                    <div className="dropdown-menu">
                        <a className={clsx("dropdown-item", classes.dropdownItem)} href="#!" id='1.2' onClick={onSelectedActivityIndex}>1.2 - If you rarely exercise</a>
                        <a className={clsx("dropdown-item", classes.dropdownItem)} href="#!" id='1.375' onClick={onSelectedActivityIndex}>1.375 - If you exercise on 1 to 3 days per week</a>
                        <a className={clsx("dropdown-item", classes.dropdownItem)} href="#!" id='1.55' onClick={onSelectedActivityIndex}>1.55 - If you exercise on 3 to 5 days per week</a>
                        <a className={clsx("dropdown-item", classes.dropdownItem)} href="#!" id='1.725' onClick={onSelectedActivityIndex}>1.725 - If you exercise 6 to 7 days per week</a>
                        <a className={clsx("dropdown-item", classes.dropdownItem)} href="#!" id='1.9' onClick={onSelectedActivityIndex}>1.9 - If you exercise every day and have<br></br>a physical job or if
                            you
                            often exercise twice a day</a>
                    </div>
                </div>
            </div>


            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-success" data-toggle="tooltip" title="Calculate TDEE" onClick={calculate}>
                    <i className={"fas fa-calculator " + classes.icon}></i>
                </button>
            </div>
            <div className="d-flex justify-content-center">
                <div className="form-group">
                    <div className="d-flex justify-content-center">Your TDEE is:</div>
                    <input value={tdee[0]} type="number" className="form-control" disabled></input>
                </div>
            </div>
        </div>
    );
}

export default CalorieCalculator;