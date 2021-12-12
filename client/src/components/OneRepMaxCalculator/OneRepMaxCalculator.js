import useStyles from './styles'
import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields'
import { UGBInput } from '../Global/UGBInput'
import clsx from 'clsx'

const OneRepMaxCalculator = () => {
    const classes = useStyles();
    const [alert, setAlert] = useState('');

    function calculate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const weight = formData.get('weight');
        const reps = formData.get('reps');
        const oneRM = document.getElementsByName('oneRMResult')[0];

        if ((reps <= 10 && reps >= 4) && (weight > 0)) {
            oneRM.value = (weight / (1.0278 - 0.0278 * reps)).toFixed(2);
        } else {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'All fields are required!'} />)
        }
    }

    return (
        <div>
            <div className='form-group d-flex justify-content-center row'>
                <h4>One Rep Max Calculator</h4>
            </div>
            <hr></hr>
            <p>
                One Rep Max(1RM) is one of the best and safest ways to measure your strength.
                One of its key benefits is that it lets you find out how much weight you can
                maximally lift for one repetition.Knowing your 1RM is useful when building
                your workout program because it makes adjusting the intensity simpler.
                <br></br><br></br>
                There are many different formulas to estimate your 1RM.The most popular and <a target='_blank'
                    rel='noreferrer'
                    href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3525823/'>
                    critically aclaimed
                </a> is the Matt Brzycki formula which this calculator is using.
                The higher the number of reps the more unreliable the 1 Rep Max estimation will be.
                Going above 10 repetitions is not recommended.The golden range for the formula is between 4-6
                repetitions.
            </p>
            {alert}
            <form onSubmit={calculate}>
                <div className='row'>
                    <UGBInput
                        type='number'
                        name='weight'
                        placeholder='Weight'
                        min='1'
                        iconStart='fas fa-balance-scale'
                    />
                    <UGBInput
                        type='number'
                        name='reps'
                        placeholder='Reps'
                        min='4'
                        max='10'
                        iconStart='fas fa-sort-numeric-up'
                    />
                </div>
                <div className='form-group d-flex justify-content-center row'>
                    <div>Your one rep max is: </div>
                </div>
                <div className='form-group d-flex justify-content-center row'>
                    <input type='number' className={clsx('form-control', classes.oneRepMaxInput)} name='oneRMResult' disabled></input>
                </div>
                <div className='d-flex justify-content-center row'>
                    <button type='submit' className='btn btn-success' data-toggle='tooltip' title='Calculate 1 Rep Max' >
                        <i className={clsx('fas fa-calculator', classes.icon)}></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OneRepMaxCalculator;