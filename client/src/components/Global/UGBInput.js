import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    cornerless: {
        borderRadius: '0px',
    },
    icon: {
        fontSize: '20px'
    },
    iconPrepend: {
        width: '50px'
    }
}));

export const UGBInput = ({ $value, type, name, placeholder, min = null, max = null, required = true, disabled = false, iconStart, children }) => {
    const styles = useStyles();

    return (
        iconStart ?
            <div className='form-group col'>
                <div className='input-group-prepend'>
                    <div className={clsx('input-group-text', styles.cornerless, styles.iconPrepend)}>
                        <i className={clsx(iconStart, styles.icon)} />
                    </div>
                    <input
                        value={$value[0]}
                        onChange={disabled ? null : (e) => $value[1](e.target.value)}
                        type={type}
                        className={clsx('form-control', styles.cornerless)}
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
            <input
                value={$value[0]}
                onChange={disabled ? null : (e) => $value[1](e.target.value)}
                type={type}
                className={'form-control'}
                name={name}
                placeholder={placeholder}
                required={required}
                min={min}
                max={max}
                disabled={disabled}
                step={type === 'number' ? '.01' : null}
            />
    );
}
