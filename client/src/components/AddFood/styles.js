import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    cornerless: {
        borderRadius: '0px',
    },
    calculatorBtn: {
        background: '#28A745',
        color: 'white',
        '&:hover': {
            background: '#218838',
            cursor: "pointer",
        }
    },
    icon: {
        fontSize: '20px',
    },
    iconPrepend: {
        width: '50px',
    },
    iconPrependFire: {
        width: '54px',
    }
}))