import { makeStyles } from '@material-ui/core';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '20px',
    },
    success: {
        borderRadius: '0px',
        background: '#28A745',
        color: 'white',
        outline: 'none',
        '&:hover': {
            cursor: 'pointer',
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
    btn: {
        color: 'white'
    }
}));

const UGBButton = ({ type = 'button', btnType, title, dataTarget, icon, onClick, variant, children }) => {
    const styles = useStyles();
    const types = {
        toggler: { style: 'navbar-toggler', dataToggle: 'tooltip' },
        inputButton: { style: 'input-group-text', dataToggle: 'tooltip' },
        success: { style: 'btn btn-success', dataToggle: 'tooltip' },
        secondary: { style: 'btn btn-secondary', dataToggle: 'tooltip' },
        danger: { style: 'btn btn-danger', dataToggle: 'tooltip' },
    }

    return (
        <button
            className={clsx(
                styles.btn,
                styles[variant],
                types[btnType] ? types[btnType].style : '',
            )}
            type={type}
            data-toggle={types[btnType]?.dataToggle}
            data-target={dataTarget || null}
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