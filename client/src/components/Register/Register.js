import { FormControlLabel, Radio } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { UGBIconInput, UGBPasswordInput } from '../Global/UGBInput';
import { UGBRadioButtonsGroup } from '../Global/UGBRadioButtonsGroup';
import { postData } from '../utils/FetchUtils';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UGBButton } from '../Global/UGBButton';
import { useEffect } from 'react';
import { UGBMenuItem, UGBSelect } from '../Global/UGBSelect';
import UGBHr from '../Global/UGBHr';
import UGBLabel from '../Global/UGBLabel';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: theme.spacing(2.5),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
        "& button": {
            width: theme.spacing(11.625),
        }
    },
    inputs: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(2),
        '@media (max-width: 460px)': {
            flexDirection: 'column',
            gap: 0,
        },
    },
    radioIcon: {
        color: '#757575'
    },
    birthDate: {
        '@media (max-width: 460px)': {
            gap: theme.spacing(1),
        },
    },

}));

const customStyles = {
    subtitle: {
        textAlign: 'left',
        width: '100%',
        marginBottom: 8,
    },
    birthDate: {
        width: '100%',
        marginBottom: 5,
    }
}

function yearIsLeap(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const monthsLabel = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};

const Register = () => {
    const history = useHistory();
    const styles = useStyles();
    const email = useState('');
    const secretUgbPassword = useState('');
    const password = useState('');
    const repeatPassword = useState('');
    const firstName = useState('');
    const lastName = useState('');
    const sex = useState('male')
    const [daysOfMonths, setDaysOfMonths] = useState([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    const [days, setDays] = useState([]);
    const day = useState(new Date().getDate());
    const [months] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [minYear] = useState(new Date().getFullYear() - 125);
    const [maxYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);

    useEffect(() => {
        const daysOfMonthCount = daysOfMonths[month - 1];
        const daysArr = [];
        for (let i = 1; i <= daysOfMonthCount; i++) {
            daysArr.push(i);
        }
        setDays(daysArr)

        const years = [];
        for (let i = minYear; i <= maxYear; i++) {
            years.push(i);
        }
        setYears(years);
    }, [])

    function changeMonth(selectedMonth) {
        setMonth(selectedMonth);
        const daysOfMonthCount = daysOfMonths[selectedMonth - 1];
        const daysArr = [];
        for (let i = 1; i <= daysOfMonthCount; i++) {
            daysArr.push(i);
        }
        setDays(daysArr)
    }

    function onChangeMonth(e) {
        changeMonth(e.target.value);
    }

    function changeYear(e) {
        setYear(e.target.value);
        if (yearIsLeap(e.target.value)) {
            const tempDaysOfMonths = daysOfMonths;
            tempDaysOfMonths[1] = 29;
            setDaysOfMonths(tempDaysOfMonths);
            changeMonth(month);
        } else {
            if (daysOfMonths[1] !== 28) {
                const tempDaysOfMonths = daysOfMonths;
                tempDaysOfMonths[1] = 28;
                setDaysOfMonths(tempDaysOfMonths);
                changeMonth(month);
            }
        }
    }

    function register(e) {
        e.preventDefault();

        if (password[0] !== repeatPassword[0]) {
            return;
        }

        if (!days[day[0]]) {
            console.log('invalid date')
            return;
        }

        const birthDate = `${year}-${month}-${day[0]}`;
        postData(process.env.REACT_APP_HOST + '/api/user/register', {
            email: email[0],
            password: password[0],
            firstName: firstName[0],
            lastName: lastName[0],
            sex: sex[0],
            secretUgbPassword: secretUgbPassword[0],
            birthDate: birthDate,
        }).then(data => {
            console.log(data);
            history.push(history.pathName);
        }, error => {
            console.log('register error', error)
        })
    }

    return (
        <form className={styles.form} onSubmit={register}>
            <UGBLabel variant='h5'>
                Sign Up
            </UGBLabel>
            <UGBHr type='horizontal' />
            <UGBLabel
                variant='subtitle1'
                style={customStyles.subtitle}
            >
                Please sign this form to create an account.
            </UGBLabel>
            <div className={styles.inputs}>
                <UGBIconInput
                    $value={firstName}
                    required
                    label='First name'
                    startIcon='fa-solid fa-file-signature'
                />
                <UGBIconInput
                    $value={lastName}
                    required
                    label='Last name'
                    startIcon='fa-solid fa-file-signature'
                />
            </div>
            <UGBIconInput
                $value={email}
                required
                label='Email'
                startIcon='fas fa-envelope'
            />
            <UGBPasswordInput
                $value={secretUgbPassword}
                required
                label='Secret UGB password'
                startIcon='fas fa-lock'
            />
            <div className={styles.inputs}>
                <UGBPasswordInput
                    $value={password}
                    required
                    label='Password'
                    startIcon='fas fa-lock'
                />
                <UGBPasswordInput
                    $value={repeatPassword}
                    required
                    label='Repeat password'
                    startIcon='fas fa-lock'
                />
            </div>
            <UGBLabel
                variant='subtitle1'
                style={customStyles.birthDate}
            >
                Birth Date
            </UGBLabel>
            <div className={clsx(styles.inputs, styles.birthDate)}>
                <UGBSelect label='' $value={day}>
                    {days.map(x => {
                        return (
                            <UGBMenuItem key={x} value={x}>
                                {x}
                            </UGBMenuItem>
                        )
                    })}
                </UGBSelect>
                <UGBSelect label='' value={month} onChange={onChangeMonth}>
                    {months.map(x => {
                        return (
                            <UGBMenuItem key={x} value={x}>
                                {monthsLabel[x]}
                            </UGBMenuItem>
                        )
                    })}
                </UGBSelect>
                <UGBSelect label='' value={year} onChange={changeYear}>
                    {years.map(x => {
                        return (
                            <UGBMenuItem key={x} value={x}>
                                {x}
                            </UGBMenuItem>
                        )
                    })}
                </UGBSelect>
            </div>
            <UGBRadioButtonsGroup
                label="Sex:"
                display='inline'
                $checkedValue={sex}
                customMap={() => {
                    return (
                        <>
                            <FormControlLabel key={'male'} value={'male'} control={<Radio />} label={<i className={clsx("fas fa-mars", styles.icon, styles.radioIcon)} />} />
                            <FormControlLabel key={'female'} value={'female'} control={<Radio />} label={<i className={clsx("fas fa-venus", styles.icon, styles.radioIcon)} />} />
                        </>
                    );
                }}
            />
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Sign Up
                </UGBButton>
            </div>
        </form>
    );
}

export default Register;