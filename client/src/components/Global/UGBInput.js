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

export const UGBInput = ({ type, name, placeholder, min = null, max = null, required = true, iconStart, children }) => {
    const styles = useStyles();

    return (
        <div className='form-group col'>
            <div className='input-group-prepend'>
                <div className={clsx('input-group-text', styles.cornerless, styles.iconPrepend)}>
                    <i className={clsx(iconStart, styles.icon)} />
                </div>
                <input
                    type={type}
                    className={clsx('form-control', styles.cornerless)}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    min={min}
                    max={max}
                />
                {children}
            </div>
        </div>
    );
}
