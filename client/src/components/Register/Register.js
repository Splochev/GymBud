import { FormControlLabel, Radio, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { UGBInput } from '../Global/UGBInput';
import { UGBRadioButtonsGroup } from '../Global/UGBRadioButtonsGroup';
import { postData } from '../utils/FetchUtils';
import { makeStyles } from '@material-ui/core';
import UGBButton from '../Global/UGBButton';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hr: {
        width: '100%',
        color: '#CED4DA',
        opacity: 0.5
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
            width: '93px'
        }
    },
}));

const Register = ({ onClose }) => {
    const history = useHistory();
    const styles = useStyles();
    const email = useState('');
    const password = useState('');
    const repeatPassword = useState('');
    const firstName = useState('');
    const lastName = useState('');
    const sex = useState('male')

    function register(e) {
        e.preventDefault();

        if (password[0] !== repeatPassword[0]) {
            return;
        }

        postData(process.env.REACT_APP_HOST + '/api/user/register', {
            "email": email[0],
            "password": password[0],
            "firstName": firstName[0],
            "lastName": lastName[0],
            "sex": sex[0]
        }).then(data => {
            console.log(data);
            onClose();
        }, error => {
            console.log('register error', error)
        })
    }

    return (
        <form className={styles.form} onSubmit={register}>
            <Typography variant='h6' component='div' style={{ textAlign: 'center', color: '#1B1B1B' }} >Sign Up</Typography>
            <hr className={styles.hr} />
            <Typography
                variant='inherit'
                component='div'
                style={{
                    color: '#1B1B1B',
                    width: '100%',
                    marginBottom: 10,
                }}
            >
                Please sign this form to create an account.
            </Typography>
            <UGBInput
                type='text'
                label="Your email"
                $value={email}
                iconStart='fas fa-envelope'
            />
            <UGBInput
                type='password'
                $value={password}
                label='Your password'
                iconStart='fas fa-lock'
            />
            <UGBInput
                type='password'
                $value={repeatPassword}
                label='Repeat password'
                iconStart='fas fa-lock'
            />
            <UGBInput
                type='text'
                $value={firstName}
                label='Your first name'
                iconStart='fa-solid fa-file-signature'
            />
            <UGBInput
                type='text'
                $value={lastName}
                label='Your last name'
                iconStart='fa-solid fa-file-signature'
            />
            <UGBRadioButtonsGroup
                label="Sex:"
                display='inline'
                $checkedValue={sex}
                customMap={() => {
                    return (
                        <>
                            <FormControlLabel key={'male'} value={'male'} control={<Radio />} label={<i className={clsx("fas fa-mars", styles.icon)} />} />
                            <FormControlLabel key={'female'} value={'female'} control={<Radio />} label={<i className={clsx("fas fa-venus", styles.icon)} />} />
                        </>
                    );
                }}

            />
            <div className={styles.actions}>
                <UGBButton
                    onClick={() => {
                        history.push(history.pathName);
                        onClose()
                    }}
                    btnType='danger'
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type="submit"
                    btnType='success'
                >
                    Sign Up
                </UGBButton>
            </div>
        </form>
    );
}

export default Register;