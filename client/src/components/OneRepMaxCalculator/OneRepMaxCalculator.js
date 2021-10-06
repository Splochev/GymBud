import useStyles from './styles'
import { useState } from 'react';
import disable from '../Global/disableUrl';
import MissingFields from '../Global/MissingFields'

const OneRepMaxCalculator = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(event) {
        event.preventDefault();
        const weight = document.getElementById("oneRepMaxWeight");
        const reps = document.getElementById("reps");
        const oneRM = document.getElementById("one-rep-max-result");

        if ((reps.value <= 10 && reps.value >= 4) && (weight.value > 0)) {
            oneRM.value = (weight.value / (1.0278 - 0.0278 * reps.value)).toFixed(2);
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required! Repetitions must be between 4 and 10. Weight must be a positive number.'} />)
            oneRM.value = '';
        }
    }

    return (
        <div className="modal fade" id="one-rep-max-calculator">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">One Rep Max Calculator</h4>

                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>
                            One Rep Max(1RM) is one of the best and safest ways to measure your strength.
                            One of its key benefits is that it lets you find out how much weight you can
                            maximally lift for one repetition.Knowing your 1RM is useful when bulding
                            your workout program because it makes adjusting the intensity simpler.
                            <br></br><br></br>
                            There are many different formulas to estimate your 1RM.The most popular and
                            <a target="_blank" rel="noreferrer" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3525823/"> critically
                                aclaimed</a> is the Matt Brzycki formula which this calculator is using.
                            The higher the number of reps the more unreliable the 1 Rep Max estimation will be.
                            Going above 10 repetitions is not recommended.The golden range for the formula is between 4-6
                            repetitions.
                        </p>
                        {alert}
                        <div className="row">
                            <div className="col">
                                <form onSubmit={disable}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className={"fas fa-balance-scale " + classes.icon}></i></span>
                                        </div>
                                        <input type="number" className="form-control" placeholder="Weight" id="oneRepMaxWeight" min="1"></input>
                                    </div>
                                </form>
                            </div>
                            <div className="col">
                                <form onSubmit={disable}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className={"fas fa-sort-numeric-up " + classes.icon}></i></span>
                                        </div>
                                        <input type="number" className="form-control" placeholder="Repetitions" id="reps" min="4" max="10"></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <form onSubmit={disable}>
                                <div className="form-group">
                                    <div className="d-flex justify-content-center">
                                        <label htmlFor="one-rep-max-result">Your one rep max is: </label>
                                    </div>
                                    <input type="number" className="form-control" id="one-rep-max-result" disabled></input>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-success" data-toggle="tooltip" title="Calculate 1 Rep Max" onClick={calculate}>
                                <i className={"fas fa-calculator " + classes.icon}></i>
                            </button>
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

export default OneRepMaxCalculator;