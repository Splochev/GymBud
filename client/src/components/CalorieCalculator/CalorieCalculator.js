import KatchMcardleFormula from './KatchMcardleFormula/KatchMcardleFormula';
import MifflinStJeorFormula from './MifflinStJeorFormula/MifflinStJeorFormula'
import { useState } from 'react';
import useStyles from './styles.js'
import disable from '../Global/disableUrl';
import MissingFields from '../Global/MissingFields';

const CalorieCalculator = () => {
    const classes = useStyles();
    const [formula, setFormula] = useState(<KatchMcardleFormula />);
    const [alert, setAlert] = useState('');

    function onChangeKatchMcardleRadio() {
        setFormula(<KatchMcardleFormula />);
    }

    function onChangeMifflinStJeorRadio() {
        setFormula(<MifflinStJeorFormula />);
    }

    function onSelectedActivityIndex(event) {
        event.preventDefault();
        const indexValue = event.target.id;
        const indexInput = document.getElementById("activity-index");
        indexInput.textContent = indexValue;
    }

    function calculate() {
        const bmr = document.getElementById("bmr-result").value;
        const indexInput = document.getElementById("activity-index");
        const tdee = document.getElementById("tdee-result");
        tdee.value = '';
        if (bmr) {
            switch (indexInput.textContent) {
                case '1.2':
                    tdee.value = bmr * 1.2;
                    break;
                case '1.375':
                    tdee.value = bmr * 1.375;
                    break;
                case '1.55':
                    tdee.value = bmr * 1.55;
                    break;
                case '1.725':
                    tdee.value = bmr * 1.725;
                    break;
                case '1.9':
                    tdee.value = bmr * 1.9;
                    break;
                default:
                    setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required! Please select an activity index. BMR result must not be empty.'} />)

            }
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required! Please select an activity index. BMR result must not be empty.'} />)

        }
    }

    return (
        <div className="modal fade" id="calorie-calculator">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Calorie Calculator</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-center">
                            <h4>BMR calculator:</h4>
                        </div>
                        <div className="d-flex justify-content-center">
                            <form onSubmit={disable} className={classes.chooseFormula}>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="katch-mcardle-radio" name="example"
                                        value="customEx" onChange={onChangeKatchMcardleRadio} defaultChecked></input>
                                    <label className="custom-control-label" htmlFor="katch-mcardle-radio">Use Katch-McArdle Formula</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="mifflin-st-jeor-radio" name="example"
                                        value="customEx" onChange={onChangeMifflinStJeorRadio} ></input>
                                    <label className="custom-control-label" htmlFor="mifflin-st-jeor-radio">Use Mifflin-St Jeor Formula</label>
                                </div>
                            </form>
                        </div>
                        {formula}


                        <hr />

                        <div className="d-flex justify-content-center">
                            <h4>TDEE calculator:</h4>
                        </div>
                        {alert}
                        <div className="d-flex justify-content-center">
                            <div className={"dropdown dropright " + classes.activityIndexDropownWrap} id="dropdown-activity-index">
                                <button type="button" className={"btn btn-secondary dropdown-toggle " + classes.activityIndexDropownButton} id="activity-index" data-toggle="dropdown">
                                    Choose Activity Index
                                </button>
                                <div className="dropdown-menu">
                                    <a className={"dropdown-item " + classes.dropdownItem} href="#!" id='1.2' onClick={onSelectedActivityIndex}>1.2 - If you rarely exercise</a>
                                    <a className={"dropdown-item " + classes.dropdownItem} href="#!" id='1.375' onClick={onSelectedActivityIndex}>1.375 - If you exercise on 1 to 3 days per week</a>
                                    <a className={"dropdown-item " + classes.dropdownItem} href="#!" id='1.55' onClick={onSelectedActivityIndex}>1.55 - If you exercise on 3 to 5 days per week</a>
                                    <a className={"dropdown-item " + classes.dropdownItem} href="#!" id='1.725' onClick={onSelectedActivityIndex}>1.725 - If you exercise 6 to 7 days per week</a>
                                    <a className={"dropdown-item " + classes.dropdownItem} href="#!" id='1.9' onClick={onSelectedActivityIndex}>1.9 - If you exercise every day and have<br></br>a physical job or if
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
                            <form onSubmit={disable}>
                                <div className="form-group">
                                    <div className="d-flex justify-content-center">
                                        <label htmlFor="tdee-result">Your TDEE is:</label>
                                    </div>
                                    <input type="number" className="form-control" id="tdee-result" disabled></input>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalorieCalculator;