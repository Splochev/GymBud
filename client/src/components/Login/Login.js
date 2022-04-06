import { UGBIconInput, UGBPasswordInput } from '../Global/UGBInput';
import { useStoreContext } from '../store/Store';
import { postData } from '../utils/FetchUtils'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import UGBLink from '../Global/UGBLink';
import { makeStyles } from '@material-ui/core';
import { UGBButton } from '../Global/UGBButton';
import UGBHr from '../Global/UGBHr';
import UGBLabel from '../Global/UGBLabel';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotPass: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(0.5),
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
            width: theme.spacing(11.625),
        }
    },
}));

const customStyles = {
    subtitle: {
        textAlign: 'left',
        width: '100%',
        marginBottom: 8,
    }
}

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
            <UGBLabel
                variant='h5'
            >
                Sign In
            </UGBLabel>
            <UGBHr type='horizontal' />
            <UGBLabel
                variant='subtitle1'
                style={customStyles.subtitle}
            >
                Please fill in this form to sign in.
            </UGBLabel>
            <UGBIconInput
                $value={email}
                required
                label='Your email'
                startIcon='fas fa-envelope'
            />
            <UGBPasswordInput
                $value={password}
                required
                label='Your password'
                startIcon='fas fa-lock'
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
                    Sign In
                </UGBButton>
            </div>
        </form>
    );
}

export default Login;