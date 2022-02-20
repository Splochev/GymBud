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
            cursor:'pointer'
        }
    }
}));

const UGBLink = ({ type, url, icon, target, onClick, label, color }) => {
    const types = {
        outlineLight: { style: 'btn btn-outline-light', dataToggle: 'collapse' },
    }
    const targets = { blank: '_blank', default: '_self' }
    const styles = useStyles();

    return (
        <a
            className={clsx(!type || types[type].style, styles[color])}
            href={url}
            rel="noreferrer"
            target={targets[target]}
            onClick={onClick || null}
        >
            {label ?
                label
                :
                <i className={clsx(icon, styles.icon)} />
            }
        </a>
    );
}

export default UGBLink;