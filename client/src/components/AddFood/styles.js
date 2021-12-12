import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    icon: {
        fontSize: '20px',
    },
    calculatorBtn: {
        borderRadius: '0px',
        background: '#28A745',
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#218838'
        }
    }
}))