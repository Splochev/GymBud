import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../utils/RouteUtils.js';
import { putData } from '../utils/FetchUtils'
import { makeStyles } from '@material-ui/core';
import logoNoBackgroundWithSlogan from '../assets/logo-no-background-with-slogan.svg'
import UGBLabel from '../Global/UGBLabel';
import UGBLink from '../Global/UGBLink.js';

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
    formTitle: {
        display: 'flex',
        alignItems: 'start',
        width: '420px',
        flexDirection: 'column',
        gap: theme.spacing(1)
    },
    goToSignIn: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(0.5),
        justifyContent: 'center'
    },
}));


const Verify = () => {
    const styles = useStyles();
    const history = useHistory();
    const { token } = useQuery();
    const [verified, setVerified] = useState(null);

    async function verifyRegistration() {
        try {
            const data = await putData(process.env.REACT_APP_HOST + `/api/user/verify?token=${token}`);
            if (!data) {
                setVerified(false);
                throw Error('Incorrect token!')
            }
            setVerified(true);
        } catch (err) {
            setVerified(false);
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (token) {
            verifyRegistration();
        } else {
            history.push('/home');
        }
    }, [token])

    return (
        <div className={styles.form}>
            <div className={styles.formTitle}>
                <UGBLabel variant='h5'>
                    Verification {verified === true ? 'was successful.' : verified === false ? 'failed.' : '.'}
                </UGBLabel>
                {verified === true ?
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
                    :
                    null
                }
                {verified === false ?
                    <>
                        <UGBLabel variant='subtitle2'>
                            User could be already verified or there might be a problem<br />
                            with the verification link. Please check your verification link<br />
                            or contact support.
                        </UGBLabel>
                        <UGBLink
                            label='Go back to home page.'
                            color='blue'
                            onClick={(e) => {
                                e.preventDefault();
                                history.push('/home');
                            }}
                        />
                    </>
                    :
                    null
                }
            </div>
        </div >
    );
}

const VerifyRegistration = () => {
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
                <Verify />
            </div>
        </div>
    );
}

export default VerifyRegistration;
