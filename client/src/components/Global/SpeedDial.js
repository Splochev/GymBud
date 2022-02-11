import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(7.5),
        right: theme.spacing(2.5),
        overflow: 'hidden'
    },
    toolTip: {
        color:'red !important'
    }
}));

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
];

export default function SpeedDialTooltipOpen({ open, handleOpen, handleClose }) {
    const styles = useStyles();

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={styles.speedDial}
                hidden={true}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        onMouseEnter={handleOpen}
                        onMouseLeave={handleClose}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </>
    );
}
