import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '20px'
    },
    white: {
        color: 'white',
        fontSize: '15px',
        '&:hover': {
            color: 'white'
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
    outlineLight: {
        width: '35px',
        height: '35px',
        border: '1px solid white',
        borderRadius: '0.25rem',
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

const UGBLink = ({ type, url, icon, target, onClick, label, color }) => {
    const targets = { blank: '_blank', default: '_self' }
    const styles = useStyles();

    return (
        <a
            className={clsx(!type || styles[type], styles[color])}
            href={url}
            rel="noreferrer"
            target={targets[target]}
            onClick={onClick || null}
        >
            {label ?
                <span>{label}</span>
                :
                <i className={clsx(icon, styles.icon)} />
            }
        </a>
    );
}

export default UGBLink;