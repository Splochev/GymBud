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
        gap: 10,
    },
    activityIndex: {
        '& button': {
            width: '235px'
        }
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    hr: {
        width: '100%',
        color: '#CED4DA',
        opacity: 0.5
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
        minHeight: '745px',
    },
    katchFormulaLayout: {
        display: 'flex',
        width: '100%',
        justifyContent: "space-between",
        gap: 15
    },
    subTitle: {
        color: '#1B1B1B',
        padding: 0,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1',
        letterSpacing: '0.00938em',
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        color: '#1B1B1B'
    },
    marginTopTitle: {
        marginTop: 10
    },
    marginBottomTitle: {
        marginBottom: 10
    },
    noPadding: {
        padding: 0
    }
}))