import React, { forwardRef, useState } from 'react';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { UGBInput } from './UGBInput';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const UGBMenuItem = forwardRef((props, ref) =>
    <MenuItem innerRef={ref} {...props} />)

const useSelectStyles = makeStyles((theme) => ({
    select: {
        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
    arrow: {
        right: theme.spacing(0.5),
        position: 'absolute',
        cursor: 'pointer',
    }
}));

export function UGBSelect({ label, value, onChange, onChangeWithNotify, children, ...props }) {
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
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            IconComponent={(props) => <ExpandMoreIcon fontSize='large' {...props} className={styles.arrow} onClick={() => setOpen(!open)} />}
            input={<UGBInput label={label} />}
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
            IconComponent={(props) => <ExpandMoreIcon fontSize='large' {...props} className={styles.arrow} onClick={() => setOpen(!open)} />}
            input={<UGBInput label={label} />}
        >
            {children}
        </Select>
    );
}
