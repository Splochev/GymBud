import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    warning: {
        color: '#F42A82',
    },
    success: {
        color: '#00c851',
    }
}));

export function BrandAlert(params) {
    const styles = useStyles();
    return (
        <div className={clsx(params.className, params.success ? styles.success : styles.warning)}>
            {params.children}
        </div>
    );
}