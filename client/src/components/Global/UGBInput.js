import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '20px',
        background: '#E9ECEF',
        color: '#1B1B1B',
        width: '53px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #CED4DA'
    },
    iconInput: {
        display: 'flex',
        marginBottom: 10,
        width: '100%',
    },
    input: {
        outline: 'none',
        display: 'block',
        width: '100%',
        padding: '0.375rem .75rem',
        fontSize: '1rem',
        fontWeight: 40,
        lineHeight: 1.5,
        color: '#495057',
        backgroundColor: '#fff',
        backgroundClip: 'padding-box',
        border: '1px solid #ced4da',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        '&:focus': {
            boxShadow: 'rgb(191,222,255) 0px 0px 0px 3px',
            border: '1px solid #80BDFF',
            outlineWidth: '0px'
        },
        '&:disabled': {
            border: '1px solid #CED4DA',
            backgroundColor: '#E9ECEF',
            color: '#5A6067',
            borderRadius: '5px'
        }
    },
    biggerIcon: {
        width: '61px'
    },
    subTitle: {
        color: '#1B1B1B',
        padding: 0,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0.00938em',
        textAlign: 'left',
        width: '100%',
        marginTop: 3,
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left'
    },
    btnContainer: {
        width: '100%'
    },
    cornerLess: {
        '& button': {
            borderRadius: 0
        }
    }
}));

export const UGBInput = ({ $value, type, name, label, min = null, max = null, placeholder, hasButton, required = true, disabled = false, iconStart, children }) => {
    const styles = useStyles();

    return (
        iconStart ?
            <div className={clsx(styles.btnContainer, hasButton ? styles.cornerLess : '')}>
                {label ? <Typography variant='subtitle2' component='div' className={styles.subTitle} >{label}</Typography> : null}
                <div className={styles.iconInput}>
                    <div className={clsx(styles.icon, hasButton ? styles.biggerIcon : '')}>
                        <i className={iconStart} />
                    </div>
                    <input
                        value={$value[0]}
                        onChange={disabled ? null : (e) => $value[1](e.target.value)}
                        type={type}
                        className={styles.input}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        min={min}
                        max={max}
                        disabled={disabled}
                        step={type === 'number' ? '.01' : null}
                    />
                    {children}
                </div>
            </div>
            :
            <>
                <div className={styles.btnContainer}>
                    {label ? <Typography variant='subtitle2' component='div' className={styles.subTitle} >{label}</Typography> : null}
                    <input
                        value={$value[0]}
                        onChange={disabled ? null : (e) => $value[1](e.target.value)}
                        type={type}
                        className={styles.input}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        min={min}
                        max={max}
                        disabled={disabled}
                        step={type === 'number' ? '.01' : null}
                    />
                </div>
            </>
    );
}
