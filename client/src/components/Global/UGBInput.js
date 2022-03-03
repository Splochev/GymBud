import { IconButton, InputAdornment, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { BrandAlert } from './BrandAlert';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles(() => ({
    iconButton: {
        background: '#28A745',
        color: 'white',
        padding: 0,
        paddingTop: '3px',
        paddingBottom: '4px',
        paddingLeft: '20px',
        paddingRight: '20px',
        borderRadius: '21px',
        textAlign: 'center',
        marginRight: '-11px',
        border: '1px solid transparent',
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
    },
    icon: {
        fontSize: '21px',
        color: '#757575'
    },
    iconButtonColor: {
        color: 'white',
    }

}));

const UGBIconButton = ({ icon, $onClick }) => {
    const styles = useStyles()
    return (
        <IconButton onClick={$onClick} disableRipple classes={{ root: styles.iconButton }}>
            <i className={clsx(icon, styles.icon, styles.iconButtonColor)} />
        </IconButton>
    );
}

const InternalInput = forwardRef(function Input(props, ref) {
    const {
        disableUnderline,
        classes = {},
        fullWidth = false,
        inputComponent = 'input',
        multiline = false,
        type = 'text',
        ...other
    } = props;

    return (
        <InputBase
            classes={{
                ...classes,
                root: clsx(classes.root, {
                    [classes.underline]: !disableUnderline,
                }),
                underline: null,
            }}
            fullWidth={fullWidth}
            inputComponent={inputComponent}
            multiline={multiline}
            ref={ref}
            type={type}
            {...other}
        />
    );
});

export const UGBInput = withStyles(() => ({
    root: {
        width: '100%',
        position: 'relative',
        boxSizing: 'content-box',
        display: 'flex',
        flexDirection: 'column',
        color: '#1B1B1B',
        marginBottom: 8,
        // font: ...,
        // letterSpacing: ...,
    },
    label: {
        width: '100%',
        margin: '0px auto 8px 0px',
    },
    input: {
        width: '100%',
        height: 40,
        border: '1px solid #1B1B1B',
        borderRadius: 20,
        boxSizing: 'border-box',
        padding: '8px 16px',
        background: 'none',
        color: '#1B1B1B',
        // font: ...,
        // letterSpacing: ...,
    },
    error: {
        borderColor: '#df4759'
    }
}))(({ classes, ...props }) => {
    const {
        variant,
        label,
        InputLabelProps,
        inputProps,
        InputProps,
        $value,
        validator,
        validatorPassed,
        iconStart,
        ...other
    } = props;
    const [validationErr, setValidationErr] = useState([]);

    const onChange = (e) => {
        const value = e.target.value;
        if (validator) {
            setValidationErr(validator(value))
            if (validatorPassed) {
                if (validator(value).length) {
                    validatorPassed[1](false);
                } else {
                    validatorPassed[1](true);
                }
            }
        }
        $value[1](value)
    }

    return (label ?
        <label className={classes.root} {...InputLabelProps}>
            <span className={classes.label}>{label}</span>
            {$value ?
                <InternalInput
                    inputProps={inputProps}
                    {...InputProps}
                    {...other}
                    value={$value[0]}
                    onChange={onChange}
                    className={clsx(classes.input, validationErr.length ? classes.error : null)}
                />
                :
                <InternalInput inputProps={inputProps} {...InputProps} {...other} className={classes.input} />
            }
            {validationErr.map(x => <BrandAlert key={x}>{x}</BrandAlert>)}
        </label>
        : $value ?
            <InternalInput
                inputProps={inputProps}
                {...InputProps}
                {...other}
                value={$value[0]}
                onChange={onChange}
                className={clsx(classes.input, validationErr.length ? classes.error : null)}
            />
            :
            <InternalInput inputProps={inputProps} {...InputProps} {...other} className={classes.input} />
    );
});

export function UGBIconInput({ startIcon, endIcon, $$onClick, ...props }) {
    const styles = useStyles()
    return (
        <UGBInput
            InputProps={{
                startAdornment: !startIcon ? null : (
                    <InputAdornment position="start">
                        <i className={clsx(startIcon, styles.icon)} />
                    </InputAdornment>
                ),
                endAdornment: !endIcon ? null : (
                    <InputAdornment position="end">
                        {$$onClick ?
                            <UGBIconButton icon={endIcon} $onClick={$$onClick} />
                            :
                            <i className={clsx(endIcon, styles.icon)} />
                        }
                    </InputAdornment>
                ),
                labelWidth: 70
            }}
            {...props}
        />
    );
}

export function UGBPasswordInput({ startIcon, ...props }) {
    const styles = useStyles()
    const [show, setShow] = useState(false);
    const [inputType, setInputType] = useState('password')

    useEffect(() => {
        if (show) {
            setInputType('text')
        } else {
            setInputType('password')
        }
    }, [show]);

    function handleClickShowPassword(e) {
        setShow(!show);
    }

    return (
        <UGBInput
            type={inputType}
            InputProps={{
                startAdornment: !startIcon ? null : (
                    <InputAdornment position="start">
                        <i className={clsx(startIcon, styles.icon)} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton style={{ padding: '5px', marginRight: '-11px' }} onClick={handleClickShowPassword}>
                            {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            {...props}
        />
    );
}