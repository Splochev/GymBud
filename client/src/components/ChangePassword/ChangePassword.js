import { makeStyles } from '@material-ui/core';
import logoNoBackgroundWithSlogan from '../assets/logo-no-background-with-slogan.svg'
import { UGBPasswordInput } from '../Global/UGBInput';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UGBButton } from '../Global/UGBButton';
import UGBHr from '../Global/UGBHr';
import UGBLabel from '../Global/UGBLabel';
import { putData } from '../utils/FetchUtils'
import UGBModal from '../Global/UGBModal';
import UGBLink from '../Global/UGBLink';
import { useQuery } from '../utils/RouteUtils';

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
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        padding: theme.spacing(2),
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
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "center",
        marginTop: theme.spacing(2),
        "& button": {
            width: theme.spacing(23.5),
        }
    },
    formTitle: {
        display: 'flex',
        alignItems: 'start',
        width: '420px',
        flexDirection: 'column',
        gap: theme.spacing(1)
    },
    closeBtnContainer: {
        display: 'flex',
        justifyContent: 'end',
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));


const ChangePasswordForm = () => {
    const styles = useStyles();
    const history = useHistory();
    const password = useState('');
    const repeatPassword = useState('');
    const { token } = useQuery();
    const [newPasswordFormSent, setNewPasswordFormSent] = useState(false);

    useEffect(() => {
        if (!token) {
            history.push('/home');
        } 
    }, [token])

    async function onSubmitForgottenPasswordRequest(e) {
        e.preventDefault();
        try {
            if (password[0] !== repeatPassword[0]) {
                throw Error("Passwords don't match")
            }

            const data = await putData(process.env.REACT_APP_HOST + '/api/user/reset-forgotten-password', {
                token: token,
                password: password[0]
            });

            if (!data) {
                setNewPasswordFormSent(false);
                throw Error('Change password error!')
            }
            console.log(data);
            setNewPasswordFormSent(true);
        } catch (err) {
            console.log(err.message);
            setNewPasswordFormSent(false);
        }
    }

    return (
        <form onSubmit={onSubmitForgottenPasswordRequest} className={styles.form}>
            <UGBModal
                open={newPasswordFormSent}
                maxWidth='xs'
            >
                <>
                    <div className={styles.formTitle}>
                        <UGBLabel variant='h4'>
                            Password was changed successfully.
                        </UGBLabel>
                        <div className={styles.goToSignIn}>
                            <UGBLink
                                label='You may proceed to the login page.'
                                color='blue'
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/sign-in');
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.closeBtnContainer}>
                        <UGBButton
                            btnType='secondary'
                            onClick={() => history.push('/home')}
                        >
                            Close
                        </UGBButton>
                    </div>
                </>
            </UGBModal>
            <div className={styles.formTitle}>
                <UGBLabel variant='h5'>
                    Reset Password
                </UGBLabel>
            </div>
            <UGBHr type='horizontal' />
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
            <div className={styles.actions}>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Reset Password
                </UGBButton>
            </div>
        </form>
    );
}

const ChangePassword = () => {
    const styles = useStyles();
    return (
        <div
            style={{
                backgroundImage: `url(./indoorBike.svg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 90%'
            }}
            className={styles.signInContainer}
        >
            <div className={styles.signInFormAndLogo}>
                <div>
                    <img src={logoNoBackgroundWithSlogan} alt="Logo" className={styles.image} />
                </div>
                <ChangePasswordForm />
            </div>
        </div>
    );
}

export default ChangePassword;
