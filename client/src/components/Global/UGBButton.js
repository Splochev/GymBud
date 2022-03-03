import React from "react";
import { Button } from "@material-ui/core";
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: '40px',
        border: '1px solid transparent',
        color: 'white',
        textTransform: 'capitalize',
        fontSize: '1rem',
        fontWeight: 400,
    },
    primary: {
        background: '#28A745',
        '&:hover': {
            backgroundColor: '#218838',
            border: '1px solid #1E7E34',
        },
        '&:focus': {
            border: '1px solid #1E7E34',
            background: '#218838',
            boxShadow: 'rgb(163,217,176) 0px 0px 0px 3px',
            outline: 'none'
        },
        "&:disabled": {
            backgroundColor: '#087F23',
            "& .MuiButton-label": {
                color: 'white'
            }
        }
    },
    secondary: {
        background: '#dc3545',
        '&:hover': {
            backgroundColor: '#C82333',
            border: '1px solid #bd2130',
        },
        '&:focus': {
            border: '1px solid #bd2130',
            background: '#C82333',
            boxShadow: 'rgb(240,169,176) 0px 0px 0px 3px',
            outline: 'none'
        },
    },
    neutral: {
        
    }
}));

export function UGBButton({ btnType, ...params }) {
    const styles = useStyles();
    return (
        <Button disableRipple variant="contained" classes={{ root: clsx(styles.root, styles[btnType]) }} {...params} />
    );
}
