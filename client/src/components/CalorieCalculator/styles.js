import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    activityIndexDropownButton: {
        backgroundColor: '#343a40',
    },
    icon: {
        fontSize: '20px'
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
    },
    calorieCalculatorContainer: {
        minHeight: '735px'
    },
    radioGroup: {
        display: 'flex'
    }
}))