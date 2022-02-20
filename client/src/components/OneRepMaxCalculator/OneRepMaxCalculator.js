import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields';
import { UGBInput } from '../Global/UGBInput';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import UGBButton from '../Global/UGBButton';
import UGBLink from '../Global/UGBLink';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
     
        "& .btn-success": {
            marginTop: 10,
        }
    },
    hr: {
        width: '100%',
    },
    inputs: {
        width: '100%',
        display: 'flex',
    },
    result: {
        maxWidth:'200px'
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
    },
}));

const OneRepMaxCalculator = () => {
    const styles = useStyles();
    const history = useHistory();
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
        <form className={styles.form} onSubmit={calculate}>
            <Typography variant='h6' component='div' style={{ textAlign: 'center', color: '#343A40' }} >One Rep Max Calculator</Typography>
            <hr className={styles.hr} />
            <Typography
                variant='inherit'
                component='div'
                style={{
                    color: '#343A40',
                    width: '100%',
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15
                }}
            >
                <div>
                    One Rep Max(1RM) is one of the best and safest ways to measure your strength.
                    One of its key benefits is that it lets you find out how much weight you can
                    maximally lift for one repetition.Knowing your 1RM is useful when building
                    your workout program because it makes adjusting the intensity simpler.
                </div>
                <div>
                    There are many different formulas to estimate your 1RM.The most popular and&nbsp;
                    <UGBLink
                        label='critically acclaimed'
                        color='blue'
                        target='blank'
                        url='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3525823/'  
                    />
                    &nbsp;is the Matt Brzycki formula which this calculator is using.
                    The higher the number of reps the more unreliable the 1 Rep Max estimation will be.
                    Going above 10 repetitions is not recommended.The golden range for the formula is between 4-6
                    repetitions.
                </div>
            </Typography>
            {alert}
            <div className={styles.inputs}>
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
            <Typography variant='h6' component='div' style={{ textAlign: 'center', color: '#343A40' }} >Your one rep max is:</Typography>
            <input type='number' value={oneRM[0]} className={clsx('form-control', styles.result )} disabled />
            <UGBButton
                type='submit'
                btnType='success'
                title='Calculate 1 Rep Max'
                icon='fas fa-calculator'
            />
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
        </form>
    );
}

export default OneRepMaxCalculator;