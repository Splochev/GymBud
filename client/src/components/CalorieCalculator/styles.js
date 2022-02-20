import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    activityIndexDropownButton: {
        backgroundColor: '#343a40',
        width: '230px'
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
        
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    radioGroup: {
        display: 'flex'
    },
    tdeeResult: {
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        "& .form-control": {
            maxWidth: 200
        },
        "& .btn-secondary": {
            width: 230
        },
        "& .btn-success": {
            marginTop: 10,
            marginBottom: 10,
        }
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        "& .form-group": {
            maxWidth: 250
        },
        "& .form-control": {
            maxWidth: 200
        },
    },
    hr: {
        width: '100%',
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
    },
    container: {
        minHeight: '735px',
    }
}))