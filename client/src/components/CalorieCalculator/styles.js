import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    icon: {
        fontSize: '20px'
    },
    calorieCalculatorContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
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
    },
    katchFormulaLayout: {
        display: 'flex',
        width:'100%',
        justifyContent: "space-between",
    }
}))