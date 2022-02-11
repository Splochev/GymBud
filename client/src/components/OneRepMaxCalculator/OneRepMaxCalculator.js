import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields';
import { UGBInput } from '../Global/UGBInput';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    oneRepMaxInput: {
        width: '30%'
    },
    icon: {
        fontSize: '20px'
    },
    link: {
        color: '#007BFF',
        '&:hover': {
            textDecoration: 'underline',
            color: '#007BFF'
        }
    },
}));

const OneRepMaxCalculator = () => {
    const styles = useStyles();
    const [alert, setAlert] = useState('');
    const weight = useState(undefined);
    const reps = useState(undefined);
    const oneRM = useState(undefined);

    function calculate(e) {
        e.preventDefault();
        const parsedWeight = Number(weight[0]);
        const parsedReps = Number(reps[0]);

        if ((parsedReps <= 10 && parsedReps >= 4) && (parsedWeight > 0)) {
            oneRM[1]((parsedWeight / (1.0278 - 0.0278 * parsedReps)).toFixed(2));
        } else {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'All fields are required!'} />)
        }
    }

    return (
        <div>
            <h4 className='form-group d-flex justify-content-center row'>One Rep Max Calculator</h4>
            <hr />
            <p>
                One Rep Max(1RM) is one of the best and safest ways to measure your strength.
                One of its key benefits is that it lets you find out how much weight you can
                maximally lift for one repetition.Knowing your 1RM is useful when building
                your workout program because it makes adjusting the intensity simpler.
                <br /><br />
                There are many different formulas to estimate your 1RM.The most popular and&nbsp;
                <a
                    className={styles.link}
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3525823/'
                >
                    critically acclaimed
                </a>
                &nbsp;is the Matt Brzycki formula which this calculator is using.
                The higher the number of reps the more unreliable the 1 Rep Max estimation will be.
                Going above 10 repetitions is not recommended.The golden range for the formula is between 4-6
                repetitions.
            </p>
            {alert}
            <form onSubmit={calculate}>
                <div className='row'>
                    <UGBInput
                        type='number'
                        $value={weight}
                        placeholder='Weight'
                        min='1'
                        iconStart='fas fa-balance-scale'
                    />
                    <UGBInput
                        type='number'
                        $value={reps}
                        placeholder='Reps'
                        min='4'
                        max='10'
                        iconStart='fas fa-sort-numeric-up'
                    />
                </div>
                <div className='form-group d-flex justify-content-center row'> Your one rep max is: </div>
                <div className='form-group d-flex justify-content-center row'>
                    <input type='number' value={oneRM[0]} className={clsx('form-control', styles.oneRepMaxInput)} name='oneRMResult' disabled />
                </div>
                <div className='d-flex justify-content-center row'>
                    <button type='submit' className='btn btn-success' data-toggle='tooltip' title='Calculate 1 Rep Max' >
                        <i className={clsx('fas fa-calculator', styles.icon)}></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OneRepMaxCalculator;