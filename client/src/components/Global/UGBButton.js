import { makeStyles } from '@material-ui/core';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '20px',
    },
    btn: {
        display: 'inline-block',
        fontWeight: 400,
        textAlign: 'center',
        verticalAlign: 'middle',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        padding: '.375rem .75rem',
        fontSize: '1rem',
        lineHeight: '1.5',
        borderRadius: '0.25rem',
        transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        color: 'white',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    success: {
        background: '#28A745',
        '&:hover': {
            backgroundColor: '#218838',
            border: '1px solid #1E7E34',
        },
        '&:focus': {
            border: '1px solid #1E7E34',
            background: '#218838',
            boxShadow: 'rgb(163,217,176) 0px 0px 0px 3px',
            outline: 'none'
        },
    },
    danger: {
        background: '#dc3545',
        '&:hover': {
            backgroundColor: '#C82333',
            border: '1px solid #bd2130',
        },
        '&:focus': {
            border: '1px solid #bd2130',
            background: '#C82333',
            boxShadow: 'rgb(240,169,176) 0px 0px 0px 3px',
            outline: 'none'
        },
    },
    neutral: {
        background: '#1B1B1B',
        '&:hover': {
            backgroundColor: '#0D0D0D',
            border: '1px solid #545B62',
        },
        '&:focus': {
            border: '1px solid #545B62',
            background: '#0D0D0D',
            boxShadow: 'rgba(14,14,14,0.5) 0px 0px 0px 3px',
            outline: 'none'
        },
    }
}));

const UGBButton = ({ type = 'button', btnType, title, icon, onClick, children }) => {
    const styles = useStyles();

    return (
        <button
            className={clsx(
                styles.btn,
                styles[btnType],
            )}
            type={type}
            data-toggle={'tooltip'}
            title={title || null}
            onClick={onClick || null}
        >
            {icon ?
                <i className={clsx(icon, styles.icon)} />
                :
                null
            }
            {children}
        </button >
    );
}

export default UGBButton;