import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: theme.spacing(2.5)
    },
    white: {
        color: 'white',
        fontSize: theme.spacing(1.875),
        textDecoration: 'none',
        '&:hover': {
            color: 'white',
            textDecoration: 'underline',
        }
    },
    blue: {
        color: '#007BFF',
        '&:hover': {
            textDecoration: 'underline',
            color: '#007BFF',
            cursor: 'pointer'
        },
    },
    green: {
        color: '#28A745',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            color: '#28A745',
            cursor: 'pointer'
        },
    },
    primary: {
        color: '#1B1B1B',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            color: '#0D0D0D',
            cursor: 'pointer'
        },
    },
    outlineLight: {
        width: theme.spacing(4.375),
        height: theme.spacing(4.375),
        border: '1px solid white',
        borderRadius: theme.spacing(0.25),
        backgroundColor: '#1B1B1B',
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: '1rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: 'white',
            color: '#1B1B1B',
        },
        '&:focus': {
            outline: 'none',
            boxShadow: '#969A9D 0px 0px 0px 3px',
        },
    }
}));

const UGBLink = ({ type, url, icon, target, onClick, onHover, onMouseLeave, label, color, children }) => {
    const targets = { blank: '_blank', default: '_self' }
    const styles = useStyles();

    return (
        <a
            className={clsx(styles[type], styles[color])}
            href={url}
            rel="noreferrer"
            target={targets[target]}
            onClick={onClick || null}
            onMouseEnter={onHover || null}
            onMouseLeave={onMouseLeave || null}
        >
            {label ?
                <span>{label}</span>
                :
                <i className={clsx(icon, styles.icon)} />
            }
            {children}
        </a>
    );
}

export default UGBLink;