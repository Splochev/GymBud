import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    activityIndexDropownButton: {
        backgroundColor: '#343a40',
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
        color: '#343a40',
        '&:hover': {
            color: '#343a40',
            textDecoration: 'underline',
            backgroundColor: 'white'
        }
    }
}))