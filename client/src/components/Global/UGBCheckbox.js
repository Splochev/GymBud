import React from "react";
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    checkbox: {
        color: '#757575',
        '& .Mui-checked': {
            color: '#28A745',

        }
    }
}));

export function UGBCheckbox({ $value, ...props }) {
    const styles = useStyles();

    return ($value ?
        <FormControlLabel
            className={styles.checkbox}
            checked={$value[0]}
            onChange={e => $value[1](e.target.checked)}
            control={<Checkbox />}
            {...props}
        />
        :
        <FormControlLabel className={styles.checkbox} control={<Checkbox />} {...props} />
    );
}
