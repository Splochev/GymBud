import { UGBIconInput } from '../../Global/UGBInput';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UGBButton } from '../../Global/UGBButton';
import UGBHr from '../../Global/UGBHr';
import UGBLabel from '../../Global/UGBLabel';

const useStyles = makeStyles((theme) => ({
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
    },
}));

const customStyles = {
    subtitle: {
        textAlign: 'left',
        width: '100%',
        marginBottom: 8,
    }
}

const ForgotPassword = () => {
    const styles = useStyles();
    const history = useHistory();
    const email = useState('')

    return (
        <form className={styles.form}>
            <UGBLabel
                variant='h5'
            >
                Reset Your Password
            </UGBLabel>
            <UGBHr type='horizontal' />

            <UGBLabel
                variant='subtitle1'
                style={customStyles.subtitle}
            >
                Please provide your account email to reset your password.
            </UGBLabel>
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