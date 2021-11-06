import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    activityIndexDropownButton: {
        backgroundColor: '#343a40 !important',
    },
    icon: {
        fontSize: '20px'
    },
    chooseFormula: {
        paddingBottom: '25px'
    },
    activityIndexDropownWrap: {
        paddingBottom: '16px'
    },
    dropdownItem: {
        color: '#343a40 !important',
        '&:hover': {
            color: '#343a40 !important',
            textDecoration: 'underline',
            backgroundColor: 'white'
        }
    }
}))