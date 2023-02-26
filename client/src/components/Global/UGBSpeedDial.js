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
            width: theme.spacing(23.375),
            height: theme.spacing(3.75),
            color: 'white',
            background: '#28A745',
        },
        '& .MuiButtonBase-root': {
            background: '#28A745',
        },
        '& .MuiButtonBase-root:first-child': {
            width: theme.spacing(4.625),
            height: theme.spacing(4.625),
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            borderRadius: theme.spacing(0.25),
            '&:focus': {
                outline: 'none',
                boxShadow: '#969A9D 0px 0px 0px 3px',
            },
            '&:hover': {
                background: 'white',
                color: '#1B1B1B',
            },
            '& .MuiFab-label': {
                height: '100%'
            }
        }
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(-1.2),
        right: theme.spacing(2),
        '@media (max-width: 459px)': {
            bottom: theme.spacing(0),
        },
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
    { icon: <i className="fa-solid fa-weight-scale" style={{ fontSize: 20, color: 'white' }} />, name: 'Track Weight' },
    { icon: <i className="fas fa-calculator" style={{ fontSize: 20, color: 'white' }} />, name: 'Calorie Calculator' },
    { icon: <FitnessCenterIcon style={{ fontSize: 20, color: 'white' }} />, name: '1 Rep Max Calculator' },
    { icon: <i className="fa-solid fa-carrot" style={{ fontSize: 20, color: 'white' }} />, name: 'Add Food' },
];

export default function SpeedDialTooltipOpen() {
    const classes = useStylesTest();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    function onClickIcon(name) {
        switch (name) {
            case 'Track Weight':
                history.push("?tab=track-weight");
                break;
            case 'Calorie Calculator':
                history.push("?tab=calorie-calculator");
                break;
            case '1 Rep Max Calculator':
                history.push("?tab=one-rep-max-calculator");
                break;
            case 'Add Food':
                history.push("?tab=add-food");
                break;
            default:
                break;
        }
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
