import { makeStyles } from '@material-ui/core';
import logoNoBackgroundWithSlogan from '../assets/logo-no-background-with-slogan.svg'
import { UGBIconInput, UGBPasswordInput } from '../Global/UGBInput';
import { useStoreContext } from '../store/Store';
import { postData } from '../utils/FetchUtils'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import UGBLink from '../Global/UGBLink';
import { UGBButton } from '../Global/UGBButton';
import UGBHr from '../Global/UGBHr';

const useStyles = makeStyles((theme) => ({
    signInContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    signInFormAndLogo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        '@media (max-width: 880px)': {
            gap: theme.spacing(2),
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: theme.spacing(40)
    },
    form: {
        padding: theme.spacing(2),
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1),
        borderRadius: '6px',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        '@media (max-width: 880px)': {
            boxShadow: 'none',
        },
        '@media (max-width: 455px)': {
            maxWidth: '410px',
        },
        '@media (max-width: 442px)': {
            maxWidth: '400px',
        },
        '@media (max-width: 432px)': {
            maxWidth: '390px',
        },
        '@media (max-width: 422px)': {
            maxWidth: '380px',
        },
        '@media (max-width: 412px)': {
            maxWidth: '370px',
        },
        '@media (max-width: 402px)': {
            maxWidth: '360px',
        },
        '@media (max-width: 392px)': {
            maxWidth: '350px',
        },
        '@media (max-width: 382px)': {
            maxWidth: '340px',
        },
        '@media (max-width: 372px)': {
            maxWidth: '330px',
        },
        '@media (max-width: 362px)': {
            maxWidth: '320px',
        },
        '@media (max-width: 352px)': {
            maxWidth: '310px',
        },
        '@media (max-width: 342px)': {
            maxWidth: '300px',
        }
    },
    forgotPass: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(0.5),
        justifyContent: 'center'
    },
    signInBtn: {
        width: '100%',
        marginBottom: theme.spacing(1),
        "& .MuiButtonBase-root": {
            width: '100%',
        },
    }
}));

const Login = () => {
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
            <UGBIconInput
                $value={email}
                required
                label='Email'
                startIcon='fas fa-envelope'
            />
            <UGBPasswordInput
                $value={password}
                required
                label='Password'
                startIcon='fas fa-lock'
            />
            <div className={styles.signInBtn}>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Sign In
                </UGBButton>
            </div>
            <div className={styles.forgotPass}>
                <UGBLink
                    label='Forgot password?'
                    color='blue'
                    onClick={(e) => {
                        e.preventDefault();
                        history.push('/forgotten-password');
                    }}
                />
            </div>
            <UGBHr type='horizontal' />
            <UGBButton
                type='submit'
                btnType='tertiary'
                onClick={(e) => {
                    e.preventDefault();
                    history.push('/create-new-account');
                }}
            >
                Create new account
            </UGBButton>
        </form>
    );
}

const SignIn = () => {
    const styles = useStyles();
    return (
        <div
            style={{
                backgroundImage: `url(./indoorBike.svg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition:'50% 90%'
            }}
            className={styles.signInContainer}
        >
            <div className={styles.signInFormAndLogo}>
                <div>
                    <img src={logoNoBackgroundWithSlogan} alt="Logo" className={styles.image} />
                </div>
                <Login />
            </div>
        </div>
    );
}

export default SignIn;
