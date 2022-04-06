import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    icon: {
        fontSize: theme.spacing(2.5),
    },
    calorieCalculatorContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    tdeeResult: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
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
        minHeight: theme.spacing(93.125),
        width: '100%'
    },
    katchFormulaLayout: {
        display: 'flex',
        width: '100%',
        justifyContent: "space-between",
        gap: theme.spacing(2),
        '@media (max-width: 500px)': {
            flexDirection: 'column',
        }
    },
    inputs: {
        display: 'flex',
        width: '100%',
        gap: theme.spacing(2),
    },
    result: {
        fontWeight: "bolder",
    },
    radioIcon: {
        color: '#757575'
    }
}))