import React from "react";
import { Button } from "@material-ui/core";
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from "clsx";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(5),
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
            backgroundColor: '#82BD8F',
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
    tertiary: {
        background: '#007BFF',
        '&:hover': {
            backgroundColor: '#0090ff',
            border: '1px solid #0036a9',
        },
        '&:focus': {
            border: '1px solid #0036a9',
            background: '#0090ff',
            boxShadow: 'rgb(128,189,255) 0px 0px 0px 3px',
            outline: 'none'
        },
    },
    neutral: {

    },
    outlinedPrimary: {
        border: '1px solid #218838',
        color: '#218838',
        background: 'transparent',
        '&:hover': {
            background: 'transparent',
            border: '1px solid #1E7E34',
        },
        '&:focus': {
            background: 'transparent',
            border: '1px solid #1E7E34',
            boxShadow: 'rgb(163,217,176) 0px 0px 0px 3px',
            outline: 'none'
        },
    },
    outlinedSecondary: {
        border: '1px solid #dc3545',
        color: '#dc3545',
        background: 'transparent',
        '&:hover': {
            background: 'transparent',
            border: '1px solid #C82333',
        },
        '&:focus': {
            background: 'transparent',
            border: '1px solid #C82333',
            boxShadow: 'rgb(240,169,176) 0px 0px 0px 3px',
            outline: 'none'
        },
    },
    icon: {
        fontSize: theme.spacing(2.625),
        color: '#757575'
    },
    text: {
        fontSize: theme.spacing(1.75),
        color: '#757575',
        textTransform: 'capitalize'
    },
    iconButtonColor: {
        color: 'white',
    },
    iconEnd: {
        marginRight: theme.spacing(-1.375),
        padding: 0,
        paddingTop: theme.spacing(0.375),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
    },
    IconStart: {
        marginLeft: theme.spacing(-1.375),
        padding: 0,
        paddingLeft: theme.spacing(1.625),
        paddingRight: theme.spacing(1.625),
        paddingTop: theme.spacing(0.75),
        paddingBottom: theme.spacing(0.75),
    },
    iconButton: {
        background: '#28A745',
        color: 'white',
        textAlign: 'center',
        border: '1px solid transparent',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
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
            backgroundColor: '#82BD8F',
            "& .MuiButton-label": {
                color: 'white'
            }
        }
    },
    withRadius: {
        borderRadius: theme.spacing(2.625),
    },
    isListItem: {
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        paddingTop: theme.spacing(0.75),
        paddingBottom: theme.spacing(0.75),
    }
}));

export function UGBButton({ btnType, ...params }) {
    const styles = useStyles();
    return (
        <Button disableRipple variant="contained" classes={{ root: clsx(styles.root, styles[btnType]) }} {...params} />
    );
}

export const UGBIconButton = ({ disabled = false, icon, MuiIcon, $onClick, isEnd = true, isListItem = false, withRadius = true, children }) => {
    const styles = useStyles()
    return (
        <IconButton
            disabled={disabled}
            onClick={$onClick}
            disableRipple
            classes={{
                root: clsx(
                    styles.iconButton,
                    withRadius ? styles.withRadius : null,
                    !withRadius ?
                        null
                        :
                        isListItem ?
                            styles.isListItem
                            :
                            isEnd ?
                                styles.iconEnd
                                :
                                styles.IconStart,
                )
            }}
        >
            {icon ?
                <i className={clsx(icon, styles.icon, styles.iconButtonColor)} />
                :
                MuiIcon ?
                    <MuiIcon className={clsx(styles.icon, styles.iconButtonColor)} />
                    :
                    <div className={clsx(styles.text, styles.iconButtonColor)}>
                        {children}
                    </div>
            }
        </IconButton>
    );
}