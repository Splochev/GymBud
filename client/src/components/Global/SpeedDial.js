import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';

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
        color: 'red !important'
    },

}));

const actions = [
    { icon: <i class="fa-solid fa-weight-scale" style={{ fontSize: 20 }} />, name: 'Track Weight' },
];

export default function SpeedDialTooltipOpen({ open, handleOpen, handleClose }) {
    const styles = useStyles();
    const history = useHistory();

    function onClickIcon(name) {
        switch (name) {
            case 'Track Weight':
                history.push({ search: "?tab=track-weight", state: { fromPopup: true } });
                break;
            default:
                break;
        }
        handleClose()
    }

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
                        onClick={() => onClickIcon(action.name)}
                    />
                ))}
            </SpeedDial>
        </>
    );
}
