
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
    },
    cardSubTitle: {
    },
    center: {
        textAlign: 'center'
    }
}));

const UGBLabel = ({ component ='div',variant, type, children, minWidth, center = false, props }) => {
    const styles = useStyles();
    return (
        <Typography style={{ minWidth: minWidth || '' }} variant={variant} component={component}
            className={clsx(
                styles.label,
                styles[type],
                center ? styles.center : null
            )}
            {...props}
        >
            {children}
        </Typography>
    );
}

export default UGBLabel;