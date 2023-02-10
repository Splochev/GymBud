
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    label: {
        color: '#1B1B1B',
    },
    title: {
    },
    subTitle: {
    },
    cardTitle: {
        textAlign: 'center',
        fontWeight: 'bolder',
        fontSize: theme.spacing(3.125),
        color: '#1B1B1B',
        marginBottom: theme.spacing(2)
    },
    cardSubTitle: {
    },


}));

const UGBLabel = ({ component = 'div', variant, type, children, style, props }) => {
    const styles = useStyles();
    return (
        <Typography
            component={component}
            variant={variant}
            className={clsx(
                styles.label,
                styles[type]
            )}
            style={style}
            {...props}
        >
            {children}
        </Typography>
    );
}

export default UGBLabel;