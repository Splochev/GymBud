import { UGBInput } from '../../Global/UGBInput';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import UGBButton from '../../Global/UGBButton';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    },
}));

const ForgotPassword = () => {
    const styles = useStyles();
    const history = useHistory();
    const email = useState('')

    return (
        <form className={styles.form}>
            <Typography variant='h6' component='div' style={{ textAlign: 'center', color: '#343A40' }} >Reset Your Password</Typography>
            <hr className={styles.hr} />
            <Typography
                variant='inherit'
                component='div'
                style={{
                    color: '#343A40',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                    marginBottom: 10,
                }}
            >
                Please provide your account email to reset your password.
            </Typography>
            <UGBInput
                $value={email}
                type='text'
                placeholder="Your email"
                iconStart='fas fa-envelope'
            />

            <div className={styles.actions}>
                <UGBButton
                    onClick={() => history.push(history.pathName)}
                    btnType='danger'
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    btnType='success'
                    type="submit"
                >
                    Reset Your Password
                </UGBButton>
            </div>
        </form>
    );
}

export default ForgotPassword;