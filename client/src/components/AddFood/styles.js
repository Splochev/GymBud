import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    borderless: {
        borderRadius: '0px',
    },
    calculatorBtn: {
        background: '#28A745',
        '&:hover': {
            background: '#218838',
            cursor: "pointer",
        }
    },
    icon: {
        color: 'white'
    }
}))