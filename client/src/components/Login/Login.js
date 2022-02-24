import { UGBInput } from '../Global/UGBInput';
import { useStoreContext } from '../store/Store';
import { postData } from '../utils/FetchUtils'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import UGBLink from '../Global/UGBLink';
import UGBButton from '../Global/UGBButton';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hr: {
        width: '100%',
    },
    forgotPass: {
        width: '100%',
        display: 'flex',
        gap: 5,
        justifyContent: 'start'
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




const Login = ({ setShowLogin }) => {
    const styles = useStyles();
    const store = useStoreContext();
    const history = useHistory();
    const email = useState('')
    const password = useState('')

    async function onLogin(e) {
        e.preventDefault()
        try {
            const data = await postData(process.env.REACT_APP_HOST + '/api/user/login', { email: email[0], password: password[0] });
            if (!data) {
                throw Error('Incorrect email or password!')
            }
            store[1](state => (state.user = data, { ...state }))
            history.push('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <form className={styles.form} onSubmit={onLogin}>
            <Typography variant='h6' component='div' style={{ textAlign: 'center', color: '#1B1B1B' }} >Sign In:</Typography>
            <hr className={styles.hr} />
            <Typography
                variant='inherit'
                component='div'
                style={{
                    color: '#1B1B1B',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                    marginBottom: 10,
                }}
            >
                Please fill in this form to sign in.
            </Typography>
            <UGBInput
                type='text'
                name='mail'
                label="Your email"
                iconStart='fas fa-envelope'
                $value={email}
            />
            <UGBInput
                type='password'
                name='password'
                label="Your password"
                iconStart='fas fa-lock'
                $value={password}
            />
            <div className={styles.forgotPass}>
                <div>Forgot</div>
                <UGBLink
                    label='password?'
                    color='blue'
                    onClick={(e) => {
                        e.preventDefault();
                        setShowLogin(false);
                        history.push("?tab=forgotten-password");
                    }}
                />
            </div>
            <div className={styles.actions}>
                <UGBButton
                    onClick={() => {
                        history.push(history.pathName);
                    }}
                    btnType='danger'
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    btnType='success'
                    type='submit'
                >
                    Sign In
                </UGBButton>
            </div>
        </form>
    );
}

export default Login;