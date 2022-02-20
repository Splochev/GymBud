import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router-dom';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';

const useStylesTest = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        '& .MuiSpeedDialAction-staticTooltipLabel': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '187px',
            height: '30px',
            color: 'black'
        },
        '& .MuiButtonBase-root:first-child': {
            width: '47px',
            height: '47px',
            background: '#343A40',
            color: 'white',
            border: '1px solid white',
            borderRadius: '0.25rem',
            '&:focus': {
                outline: 'none',
                boxShadow: '#969A9D 0px 0px 0px 3px',
            },
            '&:hover': {
                background: 'white',
                color: '#343A40',
            },
        }
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(-2.3),
        right: theme.spacing(2),
    },
}));

const theme = createTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

const actions = [
    { icon: <i className="fa-solid fa-weight-scale" style={{ fontSize: 20, color: 'black' }} />, name: 'Track Weight' },
    { icon: <i className="fas fa-calculator" style={{ fontSize: 20, color: 'black' }} />, name: 'Calorie Calculator' },
    { icon: <FitnessCenterIcon style={{ fontSize: 20, color: 'black' }} />, name: '1 Rep Max Calculator' },
];

export default function SpeedDialTooltipOpen() {
    const classes = useStylesTest();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    function onClickIcon(name) {
        switch (name) {
            case 'Track Weight':
                history.push({ search: "?tab=track-weight", state: { fromPopup: true } });
                break;
            case 'Calorie Calculator':
                history.push({ search: "?tab=calorie-calculator", state: { fromPopup: true } });
                break;
            case '1 Rep Max Calculator':
                history.push({ search: "?tab=one-rep-max-calculator", state: { fromPopup: true } });
                break;
            default:
                break;
        }
        handleClose()
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial-tooltip"
                    className={classes.speedDial}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => onClickIcon(action.name)}
                        />
                    ))}
                </SpeedDial>
            </ThemeProvider >
        </div>
    );
}
