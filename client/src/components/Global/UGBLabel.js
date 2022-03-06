
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
    }
}));

const UGBLabel = ({ variant, type, children, minWidth }) => {
    const styles = useStyles();
    return (
        <Typography style={{ minWidth: minWidth || '' }} variant={variant} component='div' className={clsx(styles.label, styles[type])} >
            {children}
        </Typography>
    );
}

export default UGBLabel;