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
            backgroundColor: '#218838',
            border: '1px solid #1E7E34',
        },
        '&:focus': {
            border: '1px solid #1E7E34',
            background: '#218838',
            boxShadow: 'rgb(163,217,176) 0px 0px 0px 3px',
            outline:'none'
        },
    }
}))