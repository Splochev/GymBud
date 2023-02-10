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
import { UGBIconButton } from './UGBButton';
import UGBLabel from './UGBLabel';
import { TextareaAutosize } from '@material-ui/core';

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

export function UGBIconInput({ startIcon, endIcon, MuiIconStart, MuiIconEnd, imgIconStart, $$onClick, placeholder,...props }) {
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
