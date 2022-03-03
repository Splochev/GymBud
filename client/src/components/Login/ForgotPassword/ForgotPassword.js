import { UGBIconInput } from '../../Global/UGBInput';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UGBButton } from '../../Global/UGBButton';

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
            <Typography variant='h6' component='div' style={{ textAlign: 'center', color: '#1B1B1B' }} >Reset Your Password</Typography>
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
                Please provide your account email to reset your password.
            </Typography>
            <UGBIconInput
                $value={email}
                required
                label='Your email'
                startIcon='fas fa-envelope'
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
                    Reset Password
                </UGBButton>
            </div>
        </form>
    );
}

export default ForgotPassword;