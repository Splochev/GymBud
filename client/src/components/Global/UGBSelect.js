import React, { forwardRef, useState } from 'react';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { UGBInput } from './UGBInput';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';

export const UGBMenuItem = forwardRef((props, ref) =>
    <MenuItem innerRef={ref} {...props} />)

const useSelectStyles = makeStyles((theme) => ({
    select: {
        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        marginRight: theme.spacing(-0.625),
        padding: theme.spacing(0.375),
        '& .MuiSvgIcon-root': {
            color: '#757575',
        }
    }
}));

export function UGBSelect({ label, value, disabled, onChange, onChangeWithNotify, children, ...props }) {
    const styles = useSelectStyles();
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        onChange(e.target.value)
    };

    return (props.$value ?
        <Select
            classes={{ root: styles.select }}
            value={props.$value[0]}
            onChange={e => props.$value[1](e.target.value)}
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            disabled={disabled}
            IconComponent={(props) => {
                return (
                    <IconButton
                        disabled={disabled}
                        classes={{ root: styles.icon }}
                        onClick={() => {
                            setOpen(!open)
                        }}
                    >
                        <ExpandMoreIcon {...props} />
                    </IconButton>
                );
            }}
            input={<UGBInput InputProps={props.InputProps} label={label} />}
        >
            {children}
        </Select>
        :
        <Select
            classes={{ root: styles.select }}
            value={value}
            onChange={onChange ? onChange : onChangeWithNotify ? onChangeWithNotify : handleChange}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            IconComponent={(props) => {
                return (
                    <IconButton
                        classes={{ root: styles.icon }}
                        onClick={() => setOpen(!open)}
                    >
                        <ExpandMoreIcon {...props} />
                    </IconButton>
                );
            }}
            input={<UGBInput InputProps={props.InputProps} label={label} />}
        >
            {children}
        </Select>
    );
}
