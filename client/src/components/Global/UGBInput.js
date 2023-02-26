/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, InputAdornment, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'
import { forwardRef } from 'react';
import { BrandAlert } from './BrandAlert';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { UGBIconButton } from './UGBButton';
import UGBLabel from './UGBLabel';
import { TextareaAutosize } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect, useRef } from 'react'
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: theme.spacing(2.625),
        color: '#757575'
    },
    textarea: {
        width: '100%',
        maxWidth: '100%',
        border: '1px solid #1B1B1B',
        color: "#1B1B1B"
    },
    imgIcon: {
        width: 'auto',
        height: '90%',
        marginRight: theme.spacing(1.25)
    },
    iconButton: {
        padding: theme.spacing(0.625),
        marginRight: theme.spacing(-1.375)
    },
    fieldset: {
        '& .MuiInputBase-root': {
            boxShadow: 'none',
            height: '100%',
            width: '100%',
            borderRadius: '0px',
            padding: '0px'
        }
    },
    textField: {
        width: '100%',
        '& .MuiInputBase-root': {
            height: '40px',
            borderRadius: '20px',
            border: 'none',
            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
            borderColor: 'transparent',
            border: 'none',
            color: '#757575'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
            border: 'none',
            color: '#757575'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
            border: 'none',
            color: '#757575'
        },
        '& .MuiOutlinedInput-root': {
            borderColor: 'transparent',
            border: 'none',
            color: '#757575'
        },
        '& .Mui-focused': {
            borderColor: 'transparent',
            border: 'none',
            color: '#757575'
        }
    }
}));

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
        borderRadius: 20,
        boxSizing: 'border-box',
        padding: '8px 16px',
        background: '#e0e0e01a',
        color: '#1B1B1B',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
        // font: ...,
        // letterSpacing: ...,
    },
    error: {
        borderColor: '#df4759'
    },
    validationInputHeight: {
        // height: '86px'
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
        <label className={clsx(classes.root, validator && validatorPassed ? classes.validationInputHeight : null)} {...InputLabelProps}>
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

export function UGBLegendInput({ onChange, value, label, _props, endAdornment, minWidth }) {
    const classes = useStyles();

    return (
        <TextField
            label={label}
            value={value}
            id="outlined-start-adornment"
            style={minWidth ? { minWidth: minWidth } : null}
            className={classes.textField}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            InputProps={{ endAdornment: endAdornment ? endAdornment : null }}
            {..._props}
        />
    );
}


export function UGBIconInput({ startIcon, endIcon, MuiIconStart, MuiIconEnd, imgIconStart, $$onClick, placeholder, ...props }) {
    const styles = useStyles()
    return (
        <UGBInput
            placeholder={placeholder}
            InputProps={{
                startAdornment: startIcon ?
                    <InputAdornment position="start">
                        <i className={clsx(startIcon, styles.icon)} />
                    </InputAdornment>
                    :
                    MuiIconStart ?
                        <InputAdornment position="start">
                            <MuiIconStart className={styles.icon} />
                        </InputAdornment>
                        :
                        // null
                        imgIconStart ?
                            <img className={styles.imgIcon} src={imgIconStart} alt='' />
                            :
                            null
                ,
                endAdornment: endIcon ?
                    <InputAdornment position="end">
                        {$$onClick ?
                            <UGBIconButton icon={endIcon} $onClick={$$onClick} />
                            :
                            <i className={clsx(endIcon, styles.icon)} />
                        }
                    </InputAdornment>
                    :
                    MuiIconEnd ?
                        <InputAdornment position="start">
                            <MuiIconEnd className={styles.icon} />
                        </InputAdornment>
                        :
                        null
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
                        <IconButton className={styles.iconButton} onClick={handleClickShowPassword}>
                            {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            {...props}
        />
    );
}

export const UGBInputArea = ({ label, $value }) => {
    const styles = useStyles()
    return (
        <>
            <UGBLabel variant='subtitle2' type='title'>
                {label}
            </UGBLabel>
            <TextareaAutosize
                className={styles.textarea}
                minRows={3}
                value={$value[0]}
                onChange={(e) => $value[1](e.target.value)}
                placeholder='This workout is focused on my back muscles...'
            />
        </>
    );
}

const isValid = (val) => {
    const regexp = /^\d{0,2}?\:?\d{0,2}$/;

    const [hoursStr, minutesStr] = val.split(':');

    if (!regexp.test(val)) {
        return false;
    }

    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    const isValidHour = (hour) => Number.isInteger(hour) && hour >= 0 && hour < 60;
    const isValidMinutes = (minutes) => (Number.isInteger(minutes) && hours >= 0 && hours < 60) || Number.isNaN(minutes);

    if (!isValidHour(hours) || !isValidMinutes(minutes)) {
        return false;
    }

    if (minutes < 10 && Number(minutesStr[0]) > 5) {
        return false;
    }

    const valArr = val.indexOf(':') !== -1
        ? val.split(':')
        : [val];

    // check mm and HH
    if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 59)) {
        return false;
    }

    if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
        return false;
    }

    return true;
}

export const UGBTimeInput = ({ initTime, label, disabled, mountFocus, onTimeChange, type, onFocusHandler, placeholder, className, name, onBlurHandler }) => {
    const [time, setTime] = useState(initTime || '');
    const _input = useRef(null)
    let lastVal = '';

    useEffect(() => {
        if (!disabled && mountFocus) {
            setTimeout(() => {
                if (_input && _input.current) {
                    if (_input.current.focus) {
                        _input.current.focus();
                    }
                }
            }, 0);
        }
    });


    const onChangeHandler = (val) => {
        if (val == time) {
            return;
        }
        if (isValid(val)) {
            if (val.length === 2 && lastVal.length !== 3 && val.indexOf(':') === -1) {
                val = val + ':';
            }

            if (val.length === 2 && lastVal.length === 3) {
                val = val.slice(0, 1);
            }

            if (val.length > 5) {
                return false;
            }

            lastVal = val;

            setTime(val);

            onTimeChange(val);
        }
    }

    const getType = () => {
        if (type) {
            return type;
        }
        return 'tel'
    }

    return (
        <UGBIconInput
            label={label}
            MuiIconStart={TimerIcon}
            name={name ? name : undefined}
            className={className}
            type={getType()}
            disabled={disabled}
            placeholder={placeholder}
            value={time}
            onChange={(e) => onChangeHandler(e.target.value)}
            onFocus={(onFocusHandler) ? (e) => onFocusHandler(e) : undefined}
            onBlur={(onBlurHandler) ? (e) => onBlurHandler(e) : undefined}
            ref={_input}
        />
    );

}
