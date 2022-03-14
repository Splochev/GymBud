import { useState } from 'react';
import UGBMissingFields from '../Global/UGBMissingFields';
import { UGBIconInput } from '../Global/UGBInput';
import { makeStyles, Typography } from '@material-ui/core';
import UGBLink from '../Global/UGBLink';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { UGBButton } from '../Global/UGBButton';
import tallyIcon from '../assets/tallyIcon.png'

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hr: {
        width: '100%',
        color: '#CED4DA',
        opacity: 0.3
    },
    inputs: {
        width: '100%',
        display: 'flex',
        gap: 10,
        '@media (max-width: 365px)': {
            flexDirection: 'column'
        }
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
    subTitle: {
        color: '#1B1B1B',
        padding: 0,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0.00938em',
        textAlign: 'center',
        width: '185px',
        marginBottom: 10
    },
    result: {
        fontWeight: "bolder",
        letterSpacing: '1.2',
    },
    icon: {
        fontSize: '20px'
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
        console.log(parsedWeight, parsedReps)


        if ((parsedReps <= 10 && parsedReps >= 4) && (parsedWeight > 0)) {
            const result = (parsedWeight / (1.0278 - 0.0278 * parsedReps)).toFixed(2);
            oneRM[1](result);
        } else {
            setAlert(<UGBMissingFields setAlert={setAlert} alertMessage={'All fields are required!'} />)
        }
    }

    return (
        <form className={styles.form} onSubmit={calculate}>
            <Typography variant='h6' component='div' style={{ textAlign: 'center', color: '#1B1B1B' }} >One Rep Max Calculator</Typography>
            <hr className={styles.hr} />
            <Typography
                variant='inherit'
                component='div'
                style={{
                    color: '#1B1B1B',
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
                <UGBIconInput
                    $value={weight}
                    required
                    startIcon='fas fa-balance-scale'
                    label="Weight"
                />
                <UGBIconInput
                    $value={reps}
                    required
                    imgIconStart={tallyIcon}
                    label="Reps"
                />
            </div>
            <Typography
                className={styles.subTitle}
                variant='subtitle2'
                component='div'>
                Your one rep max is: {!isNaN(Number(oneRM[0])) ? <span className={styles.result}>{oneRM[0]}</span> : null}
            </Typography>
            <UGBButton
                type='submit'
                btnType='primary'
                startIcon={<i className={clsx('fas fa-calculator', styles.icon)} />}
            >
                Calculate
            </UGBButton>
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                >
                    Close
                </UGBButton>
            </div>
        </form>
    );
}

export default OneRepMaxCalculator;