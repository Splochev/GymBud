import useStyles from './styles'
import { useState } from 'react';
import MissingFields from '../Global/MissingFields'

const OneRepMaxCalculator = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const weight = formData.get('weight');
        const reps = formData.get('reps');
        const oneRM = document.getElementsByName("oneRMResult")[0];

        if ((reps <= 10 && reps >= 4) && (weight > 0)) {
            oneRM.value = (weight / (1.0278 - 0.0278 * reps)).toFixed(2);
        } else {
            setAlert(<MissingFields setAlert={setAlert} alertMessage={'All fields are required!'} />)
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
                        <form onSubmit={calculate}>
                            <div className="row">
                                <div class="form-group col">
                                    <div className="input-group-prepend">
                                        <span className={"input-group-text" + ' ' + classes.borderless}><i className="fas fa-balance-scale"></i></span>
                                        <input type="number" className={"form-control" + ' ' + classes.borderless} name='weight' placeholder="Weight" min="1"></input>
                                    </div>
                                </div>
                                <div class="form-group col">
                                    <div className="input-group-prepend">
                                        <span className={"input-group-text" + ' ' + classes.borderless}><i className="fas fa-sort-numeric-up"></i></span>
                                        <input type="number" className={"form-control" + ' ' + classes.borderless} name='reps' placeholder="Reps" min="4" max="10"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group d-flex justify-content-center row">
                                <div>Your one rep max is: </div>
                            </div>
                            <div className="form-group d-flex justify-content-center row">
                                <input type="number" className={"form-control" + ' ' + classes.oneRepMaxInput} name="oneRMResult" disabled></input>
                            </div>
                            <div className="d-flex justify-content-center row">
                                <button type="submit" className="btn btn-success" data-toggle="tooltip" title="Calculate 1 Rep Max" >
                                    <i className="fas fa-calculator"></i>
                                </button>
                            </div>
                        </form>
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