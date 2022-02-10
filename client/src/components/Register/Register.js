import { FormControlLabel, Radio } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { UGBInput } from '../Global/UGBInput';
import { UGBRadioButtonsGroup } from '../Global/UGBRadioButtonsGroup';
import { postData } from '../utils/FetchUtils';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '20px'
    },
}));

const Register = ({ onClose }) => {
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
        <div>
            <h4 className="form-group d-flex justify-content-center row">Sign Up</h4>
            <hr />
            <div className="container mt-3">
                <p>Please sign this form to create an account.</p>
                <form onSubmit={register}>
                    <UGBInput
                        type='text'
                        placeholder="Your email"
                        $value={email}
                        iconStart='fas fa-envelope'
                    />
                    <UGBInput
                        type='password'
                        $value={password}
                        placeholder='Your password'
                        iconStart='fas fa-lock'
                    />
                    <UGBInput
                        type='password'
                        $value={repeatPassword}
                        placeholder='Repeat password'
                        iconStart='fas fa-lock'
                    />
                    <UGBInput
                        type='text'
                        $value={firstName}
                        placeholder='Your first name'
                        iconStart='fa-solid fa-file-signature'
                    />
                    <UGBInput
                        type='text'
                        $value={lastName}
                        placeholder='Your last name'
                        iconStart='fa-solid fa-file-signature'
                    />
                    <div className="d-flex justify-content-center">
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
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;