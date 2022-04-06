import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    vertical: {

    },
    horizontal: {
        width: '100%',
    },
    hrBase: {
        color: '#CED4DA',
        opacity: 0.3
    }
}))

const UGBHr = ({ type = 'vertical' }) => {
    const styles = useStyles()
    return (
        <hr className={
            clsx(
                styles.hrBase,
                type === 'vertical' ?
                    styles.vertical
                    :
                    type === 'horizontal' ?
                        styles.horizontal
                        :
                        ''
            )}
        />
    );
}

export default UGBHr;